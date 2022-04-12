# Prova de Conceito (lambda-consumer-new-deliveries)

Consumer lambda responsável por consumir os eventos de novas programções da fila SQS.

Basicamente ele obtêm o evento da fila e faz uma requisição HTTP para a *api-deliveries POST /v1/deliveries/process* para que seja criada a programação.

Para rodar o projeto é preciso revisar as variáveis de ambiente que se encontram no arquivo **.env** depois ir a raiz do diretório e digitar no terminal:

Instalar as dependências
`````shellscript
npm install
`````

Rodar a aplicação
`````shellscript
npm start
`````
