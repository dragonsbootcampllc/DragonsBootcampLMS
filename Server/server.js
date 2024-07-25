const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./Models");

const mainRoute = require("./Routes/index");
const morgan = require("morgan");
const { getAllUsers } = require("./Controllers/authController");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// db connection

sequelize
  .sync({alter: true})
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
  });

// main system route
app.use("/api", mainRoute);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
