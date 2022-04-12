const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const getenv = require('getenv');
const Config = require('./infrastructure/config');
const compositionRoot = require('./composition-root');
const path = require('path');

class App {
  static createApp() {
    const envFilepath = path.join(__dirname,  '.env');

    const config = new Config({ dotenv, getenv }).get(envFilepath);
    
    const app = express();
    
    // Bind third party middlewares
    app.use(compositionRoot(config));
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Bind routes
    app.use('/v1/health', require('./application/routes/v1/health.v1.route').load());
    app.use('/v1/orders', require('./application/routes/v1/orders.v1.route').load());
    
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
    
    // error handler
    app.use((err, req, res, next) => {
      res.status(err.status || 500).json( { 
        message: err.message, 
        stack: process.env.NODE_ENV !== 'production' ? err.stack : null
      });
    });

    return app;
  }
}



module.exports = App.createApp();
