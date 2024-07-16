const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require("sequelize");

const mainRoute = require('./Routes/index');
const morgan = require('morgan');

dotenv.config({path:".env"})

const app = express();
app.use(express.json());
app.use(morgan('tiny'));


// db connection
const sequelize = new Sequelize(process.env.DATABASE_URL);

async function vaildateConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
vaildateConnection();

// main system route
app.use('api/',mainRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});