const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.taskValidator = [
    // Validation rules
    check('type').isIn(['text', 'code', 'options']).withMessage('Invalid type value'),
    check('description').optional().isString().withMessage('Description must be a string'),
    check('text').optional().isString().withMessage('Text must be a string'),
    check('testcases').optional().isJSON().withMessage('Testcases must be in JSON format'),
    check('options').optional().isJSON().withMessage('Options must be in JSON format'),
    check('answer').not().isEmpty().withMessage('Answer is required'),
    check('startTime').isISO8601().withMessage('Start time must be a valid date'),
    check('endTime').isISO8601().withMessage('End time must be a valid date'),
    check('lectureId').isInt().withMessage('Lecture ID must be an integer')
];