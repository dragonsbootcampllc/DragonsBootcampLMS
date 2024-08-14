const { check } = require('express-validator');

exports.contentValidator = [
    check('title')
        .notEmpty().withMessage('Title is required'),
    check('description')
        .notEmpty().withMessage('Description is required'),
    check('type')
        .notEmpty().withMessage('Type is required'),
    check('url')
        .notEmpty().withMessage('URL is required'),
    check('file')
        .notEmpty().withMessage('File is required'),
    check('text')
        .notEmpty().withMessage('Text is required'),
    check('lectureId')
        .notEmpty().withMessage('Lecture ID is required')
        .isInt().withMessage('Lecture ID must be an integer'),
    check('uploadedBy')
        .notEmpty().withMessage('Uploaded By is required')
        .isInt().withMessage('Uploaded By must be an integer'),
];
