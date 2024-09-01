const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.contentValidator = [
    check('title')
        .notEmpty().withMessage('Title is required'),
    check('description')
        .notEmpty().withMessage('Description is required'),
    check('contentType')
        .notEmpty().withMessage('Content Type is required')
        .isIn(['link', 'file', 'text']).withMessage('Type must be one of "link", "file", or "text"'),

    body().custom((value, { req }) => {
        const { contentUrl, text } = req.body;
        const {file} = req || req.body.file;
        if ([contentUrl, file, text].filter(Boolean).length !== 1) {
            throw new Error('Only one of "url", "file", or "text" must be provided');
        }
        return true;
    }),
    validatorMiddleware
];