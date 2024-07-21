const { Sequelize } = require("sequelize");
const config = require("./config");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);

//! TODO: THIS PART WAS SUPPOSE FOR CREATING THE DATABASE IF IT DOESN'T EXIST BUT STILL DOESN'T WORK

// async function validateDatabase() {
//   // Test the connection and create the database if it doesn't exist
//   await sequelize
//     .authenticate()
//     .then(async () => {
//       console.log("Connection has been established successfully.");
//       return await sequelize.query(
//         `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
//       );
//     })
//     .then(() => {
//       console.log("Database created or already exists.");
//     })
//     .catch((err) => {
//       console.error("Unable to connect to the database:", err);
//     });
// }

// validateDatabase();

module.exports = sequelize;
