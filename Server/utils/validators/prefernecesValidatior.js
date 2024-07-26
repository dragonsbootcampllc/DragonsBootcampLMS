const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.userPreferncesValidator = [
    check('theme').optional().isString().withMessage('Theme must be a string'),
    check('notifications').optional().isBoolean().withMessage('Notifications must be a boolean'),
    check('language').optional().isString().withMessage('Language must be a string'),
];