const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.categoryValidator = [
    check('name').notEmpty().withMessage('Name is required'),
     validatorMiddleware
]
