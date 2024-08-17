const { check } = require('express-validator');

const lectureValidator = [
    check('startTime')
        .notEmpty().withMessage('Start time is required')
        .isISO8601().withMessage('Start time must be a valid date'),
    check('endTime')
        .notEmpty().withMessage('End time is required')
        .isISO8601().withMessage('End time must be a valid date'),
    check('type')
        .notEmpty().withMessage('Type is required')
        .isIn(['text', 'recorded', 'online']).withMessage('Type must be one of "text", "recorded", or "online"'),
    check('text')
        .optional()
        .isString().withMessage('Text must be a string'),
    check('recordedLink')
        .optional()
        .isString().withMessage('Recorded link must be a string'),
    check('order')
        .optional()
        .isInt({ min: 0 }).withMessage('Order must be a positive integer'),
    check('courseId')
        .notEmpty().withMessage('Course ID is required')
        .isInt().withMessage('Course ID must be an integer'),
];

module.exports = lectureValidator;
