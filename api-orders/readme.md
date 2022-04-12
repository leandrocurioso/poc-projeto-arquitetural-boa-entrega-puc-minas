# Prova de Conceito api-orders - (API Pedido)

Essa api está contida no módulo de informações cadastrais da empresa Boa Entrega e lida basicamente com regras do domínio de pedidos.

**Por se tratar de uma prova de conceito as requisições não estão passando pelo API Gateway, mas como documentado no projeto arquitetural chamadas externas devem passar pelo Gateway Externo e lá será feita a validação do JWT para que o cliente consiga atingir esse microserviço. Mesmo assim o JWT é requerido como header de chave Authorization para que possa ser obtida a identificação do cliente requisitante.**

A estratégia abordada para criação de um novo pedido é ter um endpoint para adicionar os eventos na fila SQS e um lambda para consumir esse evento. O lambda por sua vez faz uma outra requisição em outro endpoint dessa api (com final **/process**) para que o pedidos eja inserido na base de dados. Dessa forma conseguimos controlar pelo lambda o intervalo de execução (delay) para que não onere em demasia o banco de dados visto que o sistema possui uma alta concorrência. Outra vantagem é que isolamos a lógica de inserção na mesma api de pedidos.

# Exemplo JWT válido (Non-Expirable)
*Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRBY2Nlc3NLZXkiOiIwYTQ3MmJkOC02NzhlLTQ4OTEtYmZjZS0yMzk5YjY0ZGQxOTUiLCJzY29wZXMiOlsiQURNSU4iXX0.qRjJx3Xx-y7X6uvXn-mIaQpVgYP9tASYfmOjgPb1zPA*

# Rotas

#### API (POST /v1/health)
*Checa a saúde da aplicação, utilizada para os balanceadores de carga.*

#### API (POST /v1/orders/undelivered)
*Obtêm a lista de todos os pedidos com status de entrega pendente.*

#### API (POST /v1/orders)
*Insere uma novo pedido para fila SQS.* 
Os campos aqui são auto explicavéis, mas em especial o campo (thirdPartyOrderId) se trata do id do pedido do sistema do cliente caso ele queira fazer um batimento futuro.

##### Corpo da requisição application/json + validação
`````javascript
joi.object({
    body: joi.object().keys({
      thirdPartyOrderId: joi.string().min(1).max(128).required(),
      client: joi.object({
        name: joi.string().min(3).max(300).required(),
        email: joi.string().email().max(300).required(),
        telephone: joi.string().min(11).max(20).required(),
        documentId: joi.string().min(4).max(20).required(),
        documentType: joi.string().valid('CPF', 'RG').required(),
        address: joi.object({
          street: joi.string().min(6).max(300).required(),
          number: joi.string().min(1).max(10).required(),
          district:  joi.string().min(6).max(300).required(),
          zipcode: joi.string().min(8).max(8).required(),
          city:  joi.string().min(3).max(64).required(),
          state:  joi.string().min(2).max(300).required(),
          country:  joi.string().valid('BRASIL').required(),
          additional:  joi.string().max(20).optional().allow(null)
        }).required()
      }).required(),
      products: joi.array().items({
        name: joi.string().min(1).max(300).required(),
        barcode: joi.string().min(13).max(13).required(),
        quantity: joi.number().integer().min(1).required(),
        unitValue: joi.number().min(0).required(),
        width: joi.number().min(1).required(),
        height: joi.number().min(1).required(),
        depth: joi.number().min(1).required(),
        weight: joi.number().min(1).required()
      }).min(1).max(10000)
    })
  }
  )
`````

#### API (POST /v1/orders/process)
*Responsável pela inserção do pedido na base de dados (API invocada pelo **lambda-consumer-new-orders***

##### Corpo da requisição application/json + validação
`````javascript
joi.object({
      body: joi.object().keys({
        authorization: joi.string().min(10).max(2000).required(),
        clientAccessKey: joi.string().min(1).max(128).required(),
        thirdPartyOrderId: joi.string().min(1).max(128).required(),
        client: joi.object({
          name: joi.string().min(3).max(300).required(),
          email: joi.string().email().max(300).required(),
          telephone: joi.string().min(11).max(20).required(),
          documentId: joi.string().min(4).max(20).required(),
          documentType: joi.string().valid('CPF', 'RG').required(),
          address: joi.object({
            street: joi.string().min(6).max(300).required(),
            number: joi.string().min(1).max(10).required(),
            district:  joi.string().min(6).max(300).required(),
            zipcode: joi.string().min(8).max(8).required(),
            city:  joi.string().min(3).max(64).required(),
            state:  joi.string().min(2).max(300).required(),
            country:  joi.string().valid('BRASIL').required(),
            additional:  joi.string().max(20).optional().allow(null)
          }).required()
        }).required(),
        products: joi.array().items({
          name: joi.string().min(1).max(300).required(),
          barcode: joi.string().min(13).max(13).required(),
          quantity: joi.number().integer().min(1).required(),
          unitValue: joi.number().min(0).required(),
          width: joi.number().min(1).required(),
          height: joi.number().min(1).required(),
          depth: joi.number().min(1).required(),
          weight: joi.number().min(1).required()
        }).min(1).max(10000)
      })
`````

### Informações Gerais

No arquivo **db-pedidos-dump.sql** contém o DLL para criação do banco de dados  + seed dados ede tabelas auxiliares;

Para rodar o projeto é preciso revisar as variáveis de ambiente que se encontram no arquivo **.env** depois ir a raiz do diretório e digitar no terminal:

Instalar as dependências
`````shellscript
npm install
`````

Rodar a aplicação
`````shellscript
npm start
`````
