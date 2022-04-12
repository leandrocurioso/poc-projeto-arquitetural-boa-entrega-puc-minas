# Prova de Conceito (lambda-consumer-new-orders)

Consumer lambda responsável por consumir os eventos de novos pedidos da fila SQS.

Basicamente ele obtêm o evento da fila e faz uma requisição HTTP para a *api-orders POST /v1/orders/process* para que seja criado o pedido.

Para rodar o projeto é preciso revisar as variáveis de ambiente que se encontram no arquivo **.env** depois ir a raiz do diretório e digitar no terminal:

Instalar as dependências
`````shellscript
npm install
`````

Rodar a aplicação
`````shellscript
npm start
`````
