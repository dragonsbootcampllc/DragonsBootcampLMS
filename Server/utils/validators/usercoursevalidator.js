const { check } = require('express-validator');

const userCourseProgressValidator = [
    check('userId')
        .notEmpty().withMessage('User ID is required')
        .isInt().withMessage('User ID must be an integer'),
    check('courseId')
        .notEmpty().withMessage('Course ID is required')
        .isInt().withMessage('Course ID must be an integer'),
    // check('startedAt')
    //     .optional()
    //     .isISO8601().withMessage('Started at must be a valid date'),
    // check('completedAt')
    //     .optional()
    //     .isISO8601().withMessage('Completed at must be a valid date'),
    // check('isCompleted')
    //     .optional()
    //     .isBoolean().withMessage('Is Completed must be a boolean'),
];

module.exports = userCourseProgressValidator;
