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

/**
 * @swagger
 * /api/tasks/{taskId}/finish:
 *   post:
 *     summary: Mark a task as finished
 *     description: This endpoint marks a specific task as finished .
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to be marked as finished
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The answer provided by the user for the task
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 type: string
 *                 description: The answer provided by the user
 *     responses:
 *       '200':
 *         description: Task marked as finished successfully with feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the task progress record
 *                 userId:
 *                   type: integer
 *                   description: The ID of the user
 *                 answer:
 *                   type: string
 *                   description: The answer provided by the user
 *                 isSolve:
 *                   type: boolean
 *                   description: Indicates whether the task is solved
 *                 finished:
 *                   type: boolean
 *                   description: Indicates whether the task is finished
 *       '400':
 *         description: Task ID or User ID is missing or answer is required
 *       '403':
 *         description: User is not enrolled in the course related to this task
 *       '404':
 *         description: No task was found with this ID
 *       '500':
 *         description: Failed to mark task as finished
 */

router.get("/:lectureId/tasks/progress", protect, calculateAverageTaskProgress);
router.post("/:taskId/finish",protect, markTaskAsFinished);

module.exports = router;
