const dotenv = require('dotenv');
dotenv.config();

module.exports = {
NODE_ENV:process.env.NODE_ENV,
PORT:process.env.PORT,
DB_USERNAME:process.env.DB_USERNAME,
DB_PASSWORD:process.env.DB_PASSWORD,
DB_DATABASE:process.env.DB_DATABASE,
DB_HOST:process.env.DB_HOST,
DB_DIALECT:process.env.DB_DIALECT,
DB_PORT:process.env.DB_PORT,
DB_USERNAME_PD:process.env.DB_USERNAME_PD,
DB_PASSWORD_PD:process.env.DB_PASSWORD_PD,
DB_DATABASE_PD:process.env.DB_DATABASE_PD,
DB_HOST_PD:process.env.DB_HOST_PD,
DB_DIALECT_PD:process.env.DB_DIALECT_PD,
DB_PORT_PD:process.env.DB_PORT_PD
}