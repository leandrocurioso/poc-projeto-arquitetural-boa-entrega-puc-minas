const Repository = require("./repository");

class DeliveriesRepository extends Repository {
  constructor({ connectionFactory  }) {
    super({ connectionFactory });
  }

  async undeliveredOrderList(orderIds, connection = null) {
    const sql = `SELECT id AS delivery_id, latitude, longitude, order_id
    FROM \`delivery\`
    WHERE order_id IN (:orderIds)`;
    return await this.query(sql, { orderIds }, connection);
  }

  async createDelivery(data, connection = null) {
    const sql = `INSERT INTO \`delivery\` (
      order_id, latitude, longitude
    ) VALUES (
      :orderId, :latitude, :longitude
    );`;

    const result = await this.query(sql, data, connection);
    result.insertId = Number(result.insertId);
    return result;
  }

}

module.exports = DeliveriesRepository;
