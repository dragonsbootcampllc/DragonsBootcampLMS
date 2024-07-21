require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    logging: false,
    define: {
      createdAt: "createdat",
      updatedAt: "updatedat"
    },
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    define: {
      createdAt: "createdat",
      updatedAt: "updatedat"
    },
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    define: {
      createdAt: "createdat",
      updatedAt: "updatedat"
    },
    dialect: 'postgres',
  }
};
