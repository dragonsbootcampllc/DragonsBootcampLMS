const { check, body } = require('express-validator');

exports.contentValidator = [
    check('title')
        .notEmpty().withMessage('Title is required'),
    check('description')
        .notEmpty().withMessage('Description is required'),
    check('type')
        .notEmpty().withMessage('Content Type is required')
        .isIn(['link', 'file', 'text']).withMessage('Type must be one of "link", "file", or "text"'),
    check('uploadedBy')
        .notEmpty().withMessage('Uploaded By is required')
        .isInt().withMessage('Uploaded By must be an integer'),

    body().custom((value, { req }) => {
        const { url, file, text } = req.body;
        if ([url, file, text].filter(Boolean).length !== 1) {
            throw new Error('Only one of "url", "file", or "text" must be provided');
        }
        return true;
    })
];
