const Repository = require("./repository");

class WarehousesRepository extends Repository {
  constructor({ connectionFactory  }) {
    super({ connectionFactory });
  }

  async list(connection = null) {
    const orderInsertSql = `SELECT 
    id, street, district, zipcode,
    number, city, state,
    country, additional, latitude, 
    longitude
    FROM \`warehouse\`
    WHERE active = 1;`;
    return await this.query(orderInsertSql, null, connection);
  }

}

module.exports = WarehousesRepository;
