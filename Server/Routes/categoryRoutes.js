const {createCategory, getCategories, getCategoryById, updateCategory, deleteCategoryById, getContentByCategory} = require('../Controllers/categoryController');
const verifyRole = require('../utils/verifyRole');
const {categoryValidator} = require('../utils/validators/categoryValidator');
const router = require('express').Router();

router.post("/", verifyRole("educator"), categoryValidator, createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", verifyRole("educator"), categoryValidator, updateCategory);
router.delete("/:id", verifyRole("educator"),deleteCategoryById);

//get content by category
router.get("/content/:categoryName", getContentByCategory);

module.exports = router;