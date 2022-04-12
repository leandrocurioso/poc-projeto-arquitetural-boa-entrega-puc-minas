class MariaDBConnector {
  constructor({ mariadb, host, user, password, database, port }) {
    this.mariadb = mariadb;
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
    this.port = port;
  }

  async getConnection() {
    return await this.mariadb.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port
     }).catch((err) => {
       console.log(err);
     });
  }
}

module.exports = MariaDBConnector;
