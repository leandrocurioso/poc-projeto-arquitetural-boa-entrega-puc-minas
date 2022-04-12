const AwsSdk = require('aws-sdk');
const MariaDB = require('mariadb');
const axios = require('axios');

const SqsService = require('./infrastructure/services/sqs.service');
const BoaEntregaDeliveriesService = require('./infrastructure/services/boa-entrega-deliveries.service');
const MariaDBConnector = require('./infrastructure/connectors/mariadb.connector');

const OrdersRepository = require('./domain/repositories/orders.repository');
const OrdersBusiness = require('./domain/businesses/orders.bussiness');

const configService = (req, config) => {
  AwsSdk.config = new AwsSdk.Config(config.aws.security);

  req.layer.service = {
    sqsServicenewOrder: new SqsService({
      awsSdk: AwsSdk,
      queueUrl: config.aws.queue.newOrdersUrl
    }),
    boaEntregaDeliveriesService: new BoaEntregaDeliveriesService({
      axios, 
      url: config.boaEntrega.deliveries.url
    })
  };
};

const configRepository = (req, config) => {
  const connectionFactory = new MariaDBConnector({
    mariadb: MariaDB,
    host: config.database.mariadb.host,
    user: config.database.mariadb.user,
    password: config.database.mariadb.password,
    database: config.database.mariadb.database,
    port: config.database.mariadb.port
  });

  req.layer.repository = {
    orders: new OrdersRepository({ connectionFactory })
  };
};

const configBusiness = (req, config) => {
  req.layer.business = {
    orders: new OrdersBusiness({
      repository: req.layer.repository.orders,
      sqsServicenewOrder: req.layer.service.sqsServicenewOrder,
      boaEntregaDeliveriesService: req.layer.service.boaEntregaDeliveriesService
    })
  }
};

module.exports = (config) => {
  return (req, res, next) => {
    req.config = config;
    req.layer = {};
    configService(req, config);
    configRepository(req, config);
    configBusiness(req, config);
    return next();
  };
};
