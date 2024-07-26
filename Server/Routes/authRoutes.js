const { SignUp, sendOTP, verifyOTP, forgotPassword, resetPassword } = require('../Controllers/authController');
const { login } = require("../Controllers/authController");
const { loginValidator } = require("../utils/validators/authValidator");

const router = require("express").Router();

router.post("/signup", SignUp , sendOTP);
router.post("/verfiyOtp", verifyOTP);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/login", loginValidator, login);

module.exports = router;
