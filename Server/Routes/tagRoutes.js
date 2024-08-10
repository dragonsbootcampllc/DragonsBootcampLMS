const {createTag, getTags, getTagById, updateTag, deleteTagById, getContentsByTag} = require('../Controllers/tagController');

const verifyRole = require('../utils/verifyRole');
const {tagValidator} = require('../utils/validators/tagValidator');
const router = require('express').Router();

router.post("/", verifyRole("educator"), tagValidator, createTag);
router.get("/", getTags);
router.get("/:id", getTagById);
router.put("/:id", verifyRole("educator"), tagValidator, updateTag);
router.delete("/:id", verifyRole("educator"),deleteTagById);

//get content by tag
router.get("/content/:tagName", getContentsByTag);

module.exports = router;