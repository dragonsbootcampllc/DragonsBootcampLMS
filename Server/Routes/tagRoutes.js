const { createTag, getTags, getTagById, updateTag, deleteTagById, getContentsByTag } = require('../Controllers/tagController');
const verifyRole = require('../utils/verifyRole');
const { tagValidator } = require('../utils/validators/tagValidator');
const protect = require('../middlewares/protect');
const router = require('express').Router();


/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: API endpoints for tags
 */

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     summary: Get a tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tag
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '404':
 *         description: Tag not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       '201':
 *         description: Tag created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tags/{id}:
 *   put:
 *     summary: Update a tag by ID
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tag
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       '200':
 *         description: Tag updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Tag not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tag
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Tag deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Tag not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tags/content/{tagName}:
 *   get:
 *     summary: Get contents by tag name
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tagName
 *         required: true
 *         description: Name of the tag
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       '404':
 *         description: Tag not found
 *       '500':
 *         description: Internal server error
 */


router.get("/", getTags);
router.get("/:id", getTagById);
router.post("/", protect, verifyRole("educator"), tagValidator, createTag);
router.put("/:id", protect, verifyRole("educator"), tagValidator, updateTag);
router.delete("/:id", protect, verifyRole("educator"), deleteTagById);
router.get("/content/:tagName", getContentsByTag);

module.exports = router;
