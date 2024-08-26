const { markTaskAsFinished } = require('../Controllers/taskController');
const { calculateAverageTaskProgress } = require('../Controllers/taskProgressController');
const protect = require("../middlewares/protect");
const router = require("express").Router();

// Route to update task progress
/**
 * @swagger
 * /api/lectures/{lectureId}/tasks/progress:
 *   get:
 *     summary: Get average task progress for a lecture
 *     tags: [Task Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         required: true
 *         description: ID of the lecture
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskProgress'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

router.get("/:lectureId/tasks/progress", protect, calculateAverageTaskProgress);
router.post(":taskId/finish",protect, markTaskAsFinished);

module.exports = router;
