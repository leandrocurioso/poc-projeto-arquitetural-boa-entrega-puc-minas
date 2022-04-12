const Bussiness = require("./bussiness");

class WarehousesBussiness extends Bussiness {
  constructor({  repository  }) {
    super({ repository });
  }

  async list(connection = null) {
    connection = connection || await this.repository.getConnection();
    return await this.repository.list(connection);
  }

}

module.exports = WarehousesBussiness;