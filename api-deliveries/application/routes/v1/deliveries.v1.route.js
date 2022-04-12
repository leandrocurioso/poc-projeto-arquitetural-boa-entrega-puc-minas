const express = require('express');
const joi = require('joi');
const Controller = require('../controller');
const routeValidatorMiddleware = require('../../middlewares/route-validator.middleware');
const jwtMiddleware = require('../../middlewares/jwt.middleware');
const scopeMiddleware = require('../../middlewares/scope.middleware');

class DeliveriesV1Controller extends Controller {
  constructor({ router }) {
    super({ router });
  }

  load() {
    this.router.post(...this.post());
    this.router.post(...this.postProcess());
    this.router.get(...this.getUndelivered());
    return this.router;
  }

  post() {
    return [
      '/',
      jwtMiddleware,
      routeValidatorMiddleware(joi.object({
        body: joi.object().keys({
          authorization: joi.string().min(10).max(2000).required(),
          clientAccessKey: joi.string().min(1).max(128).required(),
          thirdPartyOrderId: joi.string().min(1).max(128).required(),
          order: joi.object({
            id: joi.number().integer(1).max(Number.MAX_SAFE_INTEGER).required()
          }),
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
            id: joi.number().integer(1).max(Number.MAX_SAFE_INTEGER).required(),
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
      )),
      async (req, res, next) => { 
        try {
          const deliveriesBussiness = req.layer.business.deliveries;
          const data = Object.assign({}, req.body, {
            authorization: req.authorization,
            clientAccessKey: req.jwt.clientAccessKey 
          });
          const result = await deliveriesBussiness.queueCreateEvent(data);
          res.status(200).json(result);
        } catch (err) {
          next(err);
        }
      }
    ]
  }

  postProcess() {
    return [
      '/process',
      jwtMiddleware,
      routeValidatorMiddleware(joi.object({
        body: joi.object().keys({
          authorization: joi.string().min(10).max(2000).required(),
          clientAccessKey: joi.string().min(1).max(128).required(),
          thirdPartyOrderId: joi.string().min(1).max(128).required(),
          order: joi.object({
            id: joi.number().integer(1).max(Number.MAX_SAFE_INTEGER).required()
          }),
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
            id: joi.number().integer(1).max(Number.MAX_SAFE_INTEGER).required(),
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
      )),
      async (req, res, next) => { 
        try {
          const deliveriesBussiness = req.layer.business.deliveries;
          const data = Object.assign({}, req.body, {
            authorization: req.authorization,
            clientAccessKey: req.jwt.clientAccessKey 
          });
          const result = await deliveriesBussiness.create(data);
          res.status(200).json(result);
        } catch (err) {
          next(err);
        }
      }
    ]
  }

  getUndelivered() {
    return [
      '/undelivered',
      jwtMiddleware,
      scopeMiddleware(['ADMIN']),
      async (req, res, next) => { 
        try {
          const deliveriesBussiness = req.layer.business.deliveries;
          const undeliveredOrderList = await deliveriesBussiness.undeliveredOrderList(req.authorization);
          res.status(200).json(undeliveredOrderList);
        } catch (err) {
          next(err);
        }
      }
    ];
  }
}

module.exports = new DeliveriesV1Controller({ router:  express.Router() });
