const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("provide a valid email"),
  check("password").notEmpty().withMessage("password is required"),
  validatorMiddleware,
];
