const Repository = require("./repository");

class OrdersRepository extends Repository {
  constructor({ connectionFactory  }) {
    super({ connectionFactory });
  }

  async createOrder(data, connection = null) {
    const orderInsertSql = `INSERT INTO \`order\` (
      client_access_key, third_party_order_id, client_name,
      client_document_id, client_document_type, client_address_street,
      client_address_district, client_address_number, client_address_city,
      client_address_state, client_address_country, client_address_additional,
      client_address_zipcode, client_email, client_telephone
    ) VALUES (
      :clientAccessKey, :thirdPartyOrderId, :clientName,
      :clientDocumentId, :clientDocumentType, :clientAddressStreet,
      :clientAddressDistrict, :clientAddressNumber, :clientAddressCity,
      :clientAddressState, :clientAddressCountry, :clientAddressAdditional,
      :clientAddressZipcode, :clientEmail, :clientTelephone
    );`;

    const result = await this.query(orderInsertSql, data, connection);
    result.insertId = Number(result.insertId);
    return result;
  }

  async createOrderProduct(orderId, product, connection = null) {
    const orderProductInsertSql = `INSERT INTO \`order_product\` (
      order_id, name, barcode, 
      quantity, unit_value, width, 
      height, depth, weight
    ) VALUES (
      :orderId, :name, :barcode,
      :quantity, :unitValue, :width,
      :height, :depth, :weight
    );`;

    const result = await this.query(orderProductInsertSql, {...product, orderId}, connection);
    result.insertId = Number(result.insertId);
    return result;
  }

  async list(connection = null) {
    const sql = `SELECT
      \`order\`.id AS order_id,
      third_party_order_id,
      client_name,
      client_address_street,
      client_address_district,
      client_address_number,
      client_address_city,
      client_address_state,
      client_address_country,
      client_address_additional,
      client_address_zipcode,
      client_telephone,
      title AS status_title
      FROM \`order\`
      INNER JOIN \`order_status\` ON \`order\`.order_status_id = \`order_status\`.id
      WHERE \`order\`.order_status_id = 1
    LIMIT 25;`;
    return await this.query(sql, null, connection);
  }

}

module.exports = OrdersRepository;
