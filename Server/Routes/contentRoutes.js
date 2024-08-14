const {
    createContent,
    getContents, getContent,
    updateContent, deleteContent
} = require('../Controllers/contentController');
const verifyRole = require('../utils/verifyRole');
const { contentValidator } = require('../utils/validators/contentValidator');
const router = require('express').Router();

router.post("/", verifyRole("educator"), contentValidator, createContent);
router.get("/", verifyRole("educator", "student"), getContents);
router.get("/:id", verifyRole("educator", "student"), getContent);
router.put("/:id", verifyRole("educator"), contentValidator, updateContent);
router.delete("/:id", verifyRole("educator"), deleteContent);

module.exports = router;
