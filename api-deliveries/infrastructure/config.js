class Config {
  constructor({ dotenv = Dotenv, getenv = Getenv }) {
      this.dotenv = dotenv;
      this.getenv = getenv;
  }

  get(path) {
    this.dotenv.config({ path });
      return {
          general: {
              appName: this.getenv.string('APPLICATION_NAME', 'server'),
              env: this.getenv.string('NODE_ENV', 'development'),
              port: this.getenv.int('PORT', 3000)
          },
          google: {
              geolocationApiKey: this.getenv.string('GOOGLE_GROLOCATION_API_KEY')
          },
          boaEntrega: {
              orders: {
                  url: this.getenv.string('BOA_ENTREGA_ORDERS_API_URL')
              }
          },
          aws: {
              security: {
                accessKeyId: this.getenv.string('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.getenv.string('AWS_SECRET_ACCESS_KEY'),
                region: this.getenv.string('AWS_REGION', 'us-east-1'),
              },
              queue: {
                  newDeliveriesUrl: this.getenv.string('AWS_QUEUE_URL_NEW_DELIVERIES')
              }
          },
          database: {
              mariadb: {
                  user: this.getenv.string('DB_MARIADB_USER', 'root'),
                  host: this.getenv.string('DB_MARIADB_HOST', 'localhost'),
                  database: this.getenv.string('DB_MARIADB_DATABASE', null),
                  password: this.getenv.string('DB_MARIADB_PASSWORD'),
                  port: this.getenv.int('DB_MARIADB_PORT', 3306)
              }
          }
      };
  }
}

module.exports = Config;