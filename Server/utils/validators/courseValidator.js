const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.courseValidator = [
    check('name').notEmpty().withMessage('Course name is required'),
    check('description').notEmpty().withMessage('Course description is required'),
    validatorMiddleware
]