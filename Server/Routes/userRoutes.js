const { SignUp } = require('../Controllers/userController');

const router = require('express').Router();


router.post("/signup", SignUp);

module.exports = router;