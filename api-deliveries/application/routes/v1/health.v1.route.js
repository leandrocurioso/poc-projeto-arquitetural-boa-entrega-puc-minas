const express = require('express');
const Controller = require('../controller');

class HealthV1Controller extends Controller {
  constructor({ router }) {
    super({ router });
  }

  load() {
    this.router.get(...this.get());
    return this.router;
  }

  get() {
    return [
      '/',
      async (req, res, next) => {
        res.status(200);
        res.json({ state: "healthy" });
      }
    ];
  }
}

module.exports = new HealthV1Controller({ router: express.Router() });
