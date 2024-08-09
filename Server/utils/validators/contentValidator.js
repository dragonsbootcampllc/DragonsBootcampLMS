const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.contentValidator = [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('contentType').notEmpty().withMessage('Content type is required'),
    check('uploadedBy').notEmpty().withMessage('Uploaded by is required'),
    check('lectureId').isInt().withMessage('Lecture ID must be an integer'),
    validatorMiddleware
]