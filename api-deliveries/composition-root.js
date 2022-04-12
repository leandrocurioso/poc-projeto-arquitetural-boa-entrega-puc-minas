const AwsSdk = require('aws-sdk');
const MariaDB = require('mariadb');
const axios = require('axios');

const SqsService = require('./infrastructure/services/sqs.service');
const GeoDistanceService = require('./infrastructure/services/geo-distance-calculator.service');
const BoaEntregaOrdersService = require('./infrastructure/services/boa-entrega-orders.service');

const MariaDBConnector = require('./infrastructure/connectors/mariadb.connector');

const WarehousesRepository = require('./domain/repositories/warehouses.repository');
const WarehousesBusiness = require('./domain/businesses/warehouses.bussiness');

const DeliveriesRepository = require('./domain/repositories/deliveries.repository');
const DeliveriesBusiness = require('./domain/businesses/deliveries.bussiness');

const configService = (req, config) => {
  AwsSdk.config = new AwsSdk.Config(config.aws.security);
  req.layer.service = {};
  req.layer.service.sqsServicenewDeliveries = new SqsService({
    awsSdk: AwsSdk,
    queueUrl: config.aws.queue.newDeliveriesUrl
  });

  req.layer.service.geoDistance = new GeoDistanceService({ axios, googleApiKey: config.google.geolocationApiKey });
  req.layer.service.boaEntregaOrders = new BoaEntregaOrdersService({ axios, url: config.boaEntrega.orders.url });
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
  req.layer.repository = {};
  req.layer.repository.warehouses = new WarehousesRepository({ connectionFactory });
  req.layer.repository.deliveries = new DeliveriesRepository({ connectionFactory });
};

const configBusiness = (req, config) => {
  req.layer.business = {};


  req.layer.business.warehouses = new WarehousesBusiness({
    repository: req.layer.repository.warehouses
  });

  req.layer.business.deliveries = new DeliveriesBusiness({
    repository: req.layer.repository.deliveries,
    sqsServicenewDeliveries: req.layer.service.sqsServicenewDeliveries,
    warehousesBussiness: req.layer.business.warehouses,
    geoDistanceService: req.layer.service.geoDistance,
    boaEntregaOrdersService: req.layer.service.boaEntregaOrders
  });
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
