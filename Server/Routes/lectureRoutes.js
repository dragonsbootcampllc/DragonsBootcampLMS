const {uploadLecture, updateLectureById, getLectureById, deleteLecture} = require('../Controllers/lectureController')
const contentRoutes = require('./contentRoutes');
const verifyRole = require('../utils/verifyRole');
const lectureValidator = require('../utils/validators/lectureValidator');
const protect = require('../middlewares/protect');
const lectureProgressRoutes = require('./lectureProgressRoutes');
const router = require('express').Router();


/**
 * @swagger
 * /api/lectures/{id}:
 *   get:
 *     summary: Get lecture by ID
 *     tags: [Lectures]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lecture ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/lectures:
 *   post:
 *     summary: Create a new lecture
 *     tags: [Lectures]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lecture'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/lectures/{id}:
 *   put:
 *     summary: Update lecture by ID
 *     tags: [Lectures]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lecture ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lecture'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/lectures/{id}:
 *   delete:
 *     summary: Delete lecture by ID
 *     tags: [Lectures]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lecture ID
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

router.get("/:id", protect, verifyRole('educator', 'student'), getLectureById);
router.post("/", protect, verifyRole('educator'), lectureValidator, uploadLecture);
router.put("/:id", protect, verifyRole('educator'), updateLectureById);
router.delete("/:id", protect, verifyRole('educator'), deleteLecture);

// Lecture's Content Routes
router.use("/:lectureId/content", contentRoutes);

// lecture progress routes
router.use('/',lectureProgressRoutes);

module.exports = router;