const { Sequelize } = require("sequelize");
const config = require("./config");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);

/**
Explanation of the Database Initialization Code

Overview:
Sequelize does not support direct database creation, so this process involves using a separate connection to the default PostgreSQL database for checking and creating the target database if necessary.

So using a separate connection to create the database is more reliable, here is the process in detail:

A temporary connection is established to the default PostgreSQL database (usually postgres).
This connection is used to check if the target database (as specified in the .env file) exists.

Executes a query to check if the target database exists.
If the database does not exist, it creates the database.

After ensuring the target database exists, the main Sequelize connection is established using the target database.

That's it!
*/
async function validateDatabase() {
    // Connect a separate connection to the default database
    const tempSequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    });

    try {
        // Authenticate the temporary connection
        await tempSequelize.authenticate();
        console.log("Temporary connection has been established successfully.");

        // Check if the database exists
        const [results] = await tempSequelize.query(
            `SELECT 1 FROM pg_database WHERE datname = '${dbConfig.database}'`
        );

        if (results.length === 0) {
            // Create the database if it doesn't exist
            await tempSequelize.query(
                `CREATE DATABASE ${dbConfig.database}`
            );
            console.log(`Database ${dbConfig.database} created.`);
        } else {
            console.log(`Database ${dbConfig.database} already exists.`);
        }
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    } finally {
        // Close the temporary connection
        await tempSequelize.close();
    }

    // Authenticate the main connection
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
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

validateDatabase();

module.exports = sequelize;
