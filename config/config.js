const config = require('./index');
module.exports = {
    "development": {
      "username": config.DB_USERNAME,
      "password": null,
      "database": config.DB_DATABASE,
      "host": config.DB_HOST,
      "dialect": config.DB_DIALECT,
      "port": config.DB_PORT
    },
    "production": {
      "username": config.DB_USERNAME_PD,
      "password": config.DB_PASSWORD_PD,
      "database": config.DB_DATABASE_PD,
      "host": config.DB_HOST_PD,
      "dialect": config.DB_DIALECT_PD,
      "port": config.DB_PORT_PD
    }
  }
  