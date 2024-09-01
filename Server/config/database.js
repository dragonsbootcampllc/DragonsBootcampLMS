const { Sequelize } = require("sequelize");
const config = require("./config");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);


async function validateDatabase() {
    // Connect a separate connection to the default database
    const tempSequelize = new Sequelize({
        dialect: "postgres",
        dialectOptions: {
        },
        ...dbConfig,
        database:null
    });

    try {
        // Authenticate the temporary connection
        await tempSequelize.authenticate();

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

validateDatabase().then(() => {
    // db connection
    sequelize
    .sync({alter: true,
        force:false
    })
    .then(() => {
        console.log("Database synchronized");
    })
    .catch((err) => {
        console.error("Unable to synchronize the database:", err);
    });
}).catch((err) => {
    console.error("Unable to synchronize the database:", err);
});

module.exports = sequelize;
