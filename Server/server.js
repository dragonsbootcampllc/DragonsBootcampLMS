const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./Models');

const mainRoute = require('./Routes/index');
const morgan = require('morgan');
const { getAllUsers } = require('./Controllers/authController');

dotenv.config({path:".env"})

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// db connection

sequelize.sync().then(() => {
    console.log('Database synchronized');
  }).catch(err => {
    console.error('Unable to synchronize the database:', err);
  });

// main system route
app.use('/api',mainRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});