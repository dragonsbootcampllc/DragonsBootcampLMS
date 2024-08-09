const {createContent} = require('../Controllers/contentController');
const verifyRole = require('../utils/verifyRole');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const {contentValidator} = require('../utils/validators/contentValidator');
const router = require('express').Router();

router.post("/upload", verifyRole("educator"), uploadMiddleware.single('contentFile'),contentValidator, createContent);

module.exports = router;
