const {createCategory, getCategories, getCategoryById, updateCategory, deleteCategoryById, getContentByCategory} = require('../Controllers/categoryController');
const verifyRole = require('../utils/verifyRole');
const {categoryValidator} = require('../utils/validators/categoryValidator');
const protect = require('../middlewares/protect');
const router = require('express').Router();

/**
 * @swagger
 *
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 *
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
 *     responses:
 *       '200':
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 *
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 *
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the category
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 *
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 *
 * /api/categories/content/{categoryName}:
 *   get:
 *     summary: Get content by category name
 *     tags:
 *       - Category
 *     parameters:
 *       - name: categoryName
 *         in: path
 *         description: Name of the category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */

router.post("/",protect, verifyRole("educator"), categoryValidator, createCategory);

router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.patch("/:id",protect, verifyRole("educator"), updateCategory);

router.delete("/:id",protect, verifyRole("educator"), deleteCategoryById);

router.get("/content/:categoryName", getContentByCategory);

module.exports = router;
