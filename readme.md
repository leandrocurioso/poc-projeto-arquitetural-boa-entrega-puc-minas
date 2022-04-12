# Prova de Conceito do Projeto Arquitetural Boa Entrega

##### Prova de conceito para o trabalho de conclusão de curso da pós graduação PUC Minas.

Serão desenvolvidas três histórias de relevância para o negócio da empresa Boa Entrega. Todos os projetos estão nesse reposítório separados por pastas.

## Diretórios:
* **api-orders:** API do domínio de pedidos, repsonsável por criar o pedido e sensibilizar a API de Rota & Entrega.
* **lambda-consumer-new-orders:** Consumer lambda responsável por consumir os eventos de novos pedidos da fila SQS.
* **api-deliveries:** API do domínio de Rota & Entrega, respopnsável por definir a menor rota e sensibilizar a API de Faturamento & Cobrança.
* **lambda-consumer-new-deliveries:** Consumer lambda responsável por consumir os eventos de novas entregas da fila SQS.
* **frontend-deliveries:** Front-end feito como prova de conceito para que o usuário possa ver de forma visual o tempo estimado da rota bem como o caminho traçado no mapa entre o depósito e o endereço de entrega.

## Histórias Desenvolvidos:
* **HUMIC001** - Como cliente da API de pedidos preciso fazer o cadastro de um pedido para que a empresa Boa Entrega faça a entrega.
* **HUMIC002** - Como cliente da API de rota & entrega preciso enviar as informações do pedido para que seja criada a menor rota de entrega considerando o depósito mais próximo ao endereço final.
* **HUMIC003** - Como usuário do portal corporativo preciso selecionar na interface gráfica a rota da entrega para que seja apresentado todo o caminho no mapa da rota.
