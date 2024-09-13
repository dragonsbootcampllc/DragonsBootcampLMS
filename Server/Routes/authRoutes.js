const { SignUp, sendOTP, verifyOTP, forgotPassword, resetPassword } = require('../Controllers/authController');
const { login } = require("../Controllers/authController");
const { loginValidator } = require("../utils/validators/authValidator");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: john.doe@example.com
 *             password: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: signup with username email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: educator
 *             email: educator@gmail.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/auth/verfiyOtp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: test@example.com
 *             otp: 123456
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/forgotpassword:
 *   post:
 *     summary: Forgot Password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: john.doe@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/resetpassword:
 *   post:
 *     summary: Reset Password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             password: newpassword123
 *             token: abcdefg123456
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

router.post("/signup", SignUp , sendOTP);
router.post("/login", loginValidator, login);
router.post("/verfiyOtp", verifyOTP);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);

module.exports = router;
