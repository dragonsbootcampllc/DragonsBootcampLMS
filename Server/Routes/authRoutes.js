const { SignUp } = require('../Controllers/authController');
const { getAllUsers, login } = require("../Controllers/authController");
const { loginValidator } = require("../utils/validators/authValidator");

const router = require("express").Router();

router.post("/signup", SignUp);
router.post("/login", loginValidator, login);

module.exports = router;
