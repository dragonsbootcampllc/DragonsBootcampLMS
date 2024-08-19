const {
    createContent,
    getContents, getContent,
    updateContent, deleteContent
} = require('../Controllers/contentController');
const verifyRole = require('../utils/verifyRole');
const { contentValidator } = require('../utils/validators/contentValidator');
const router = require('express').Router({ mergeParams: true });

router.post("/", verifyRole("educator"), contentValidator, createContent);
router.get("/", verifyRole("educator", "student"), getContents);
router.get("/:contentId", verifyRole("educator", "student"), getContent);
router.patch("/:contentId", verifyRole("educator"), updateContent);
router.delete("/:contentId", verifyRole("educator"), deleteContent);

module.exports = router;
