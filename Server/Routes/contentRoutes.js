
const {createContent, updateContent, deleteContent, getAllContents, getContentById } = require('../Controllers/contentController');
const verifyRole = require('../utils/verifyRole');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const {contentValidator} = require('../utils/validators/contentValidator');
const router = require('express').Router();

router.post("/", verifyRole("educator"), uploadMiddleware.single('contentFile'),contentValidator, createContent);
router.get("/", getAllContents);
router.get("/:contentId", getContentById);
router.put("/:contentId", verifyRole("educator"), contentValidator, updateContent);
router.delete("/:contentId", verifyRole("educator"), deleteContent);

module.exports = router;
