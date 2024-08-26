const {createContent, updateContent, deleteContent, getAllContents, getContentById } = require('../Controllers/contentController');
const verifyRole = require('../utils/verifyRole');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const {contentValidator} = require('../utils/validators/contentValidator');
const protect = require('../middlewares/protect');
const router = require('express').Router({mergeParams: true});

/**
 * @swagger
 * /api/lectures/{lectureId}/content:
 *   post:
 *     summary: Create content
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                 - title
 *                 - description
 *                 - contentType
 *             properties:
 *                title:
 *                    type: string
 *                    description: content title
 *                description:
 *                    type: string
 *                    description: content description
 *                contentType: 
 *                    type: string
 *                    enum: [link, text, file]
 *                    description: type of content
 *                contentUrl:
 *                    type: string
 *                    description: url of the content
 *                contentFile:
 *                    type: file
 *                    description: file of the content
 *                contentText:
 *                    type: string
 *                    description: text of the content
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/lectures/{lectureId}/content:
 *   get:
 *     summary: Get all contents
 *     tags: [Content]
 *     parameters:
 *       - name: lectureId
 *         in: path
 *         required: true
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/lectures/{lectureId}/content/{contentId}:
 *   get:
 *     summary: Get content by ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/lectures/{lectureId}/content/{contentId}:
 *   put:
 *     summary: Update content by ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/lectures/{lectureId}/content/{contentId}:
 *   delete:
 *     summary: Delete content by ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

router.post("/",protect, verifyRole("educator"), uploadMiddleware.single('contentFile'),contentValidator, createContent);
router.get("/", getAllContents);
router.get("/:contentId", getContentById);
router.put("/:contentId",protect, verifyRole("educator"), contentValidator, updateContent);
router.delete("/:contentId",protect, verifyRole("educator"), deleteContent);

module.exports = router;
