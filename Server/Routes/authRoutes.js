const { SignUp } = require('../Controllers/authController');

const router = require('express').Router();

router.post("/signup", SignUp);

module.exports = router;