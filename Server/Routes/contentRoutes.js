const {createContent, updateContent, deleteContent, getAllContents, getContentById } = require('../Controllers/contentController');
const verifyRole = require('../utils/verifyRole');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const {contentValidator} = require('../utils/validators/contentValidator');
const router = require('express').Router();

router.post("/upload", verifyRole("educator"), uploadMiddleware.single('contentFile'),contentValidator, createContent);
router.get("/", getAllContents);
router.get("/:id", getContentById);
router.put("/:id", verifyRole("educator"), contentValidator, updateContent);
router.delete("/:id", verifyRole("educator"), deleteContent);

module.exports = router;
