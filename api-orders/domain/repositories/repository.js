class Repository {
  constructor({ connectionFactory }) {
    this.connectionFactory = connectionFactory;
  }

  async truncateTable(tableName, connection = null) {
    connection = connection || await this.getConnection();
    return await connection.query({ sql: `TRUNCATE TABLE \`${tableName}\`;` });
  }


  async getConnection() {
    return await this.connectionFactory.getConnection();
  }

  async query(sql, params, connection = null) {
    connection = connection || await this.getConnection();
    return await connection.query({ namedPlaceholders: true, sql }, params);
  }
}

module.exports = Repository;