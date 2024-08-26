const { storeProgress, retrieveProgress } = require('../Controllers/userCourseProgressController');
const protect = require("../middlewares/protect");
const verifyCourseOwner = require('../utils/verifyCourseOwner');
const router = require("express").Router();

/**
 * @swagger
 * /api/courses/{id}/progress:
 *   post:
 *     summary: Store course progress
 *     tags: [Course Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCourseProgress'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   get:
 *     summary: Retrieve course progress
 *     tags: [Course Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCourseProgress'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */


router.post("/:id/progress", protect,verifyCourseOwner, storeProgress);
router.get("/:id/progress", protect,verifyCourseOwner, retrieveProgress);

module.exports = router;
