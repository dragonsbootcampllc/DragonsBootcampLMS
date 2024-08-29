const {uploadTask, getTaskById, updateTask, deleteTaskById, getRecentTask} = require('../Controllers/taskController');
const verifyRole = require('../utils/verifyRole');
const {taskValidator} = require('../utils/validators/taskValidator');
const protect = require('../middlewares/protect');
const router = require('express').Router();

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/tasks/recent/{limit}:
 *   get:
 *     summary: Get recent tasks
 *     description: Fetches the most recent tasks based on the provided limit. The limit should be a positive integer and less than or equal to 4.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *         description: The number of recent tasks to retrieve (must be between 1 and 4)
 *     responses:
 *       200:
 *         description: Successful response with recent tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       type:
 *                         type: string
 *                         example: text
 *                       description:
 *                         type: string
 *                         example: Task 1 description
 *                       text:
 *                         type: string
 *                         example: Solve the next problem
 *                       testcases:
 *                         type: string
 *                         nullable: true
 *                       options:
 *                         type: string
 *                         nullable: true
 *                       answer:
 *                         type: string
 *                         example: no thanks
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-10T08:15:00.000Z
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-09-10T08:15:00.000Z
 *                       createdat:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-22T18:28:49.021Z
 *                       updatedat:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-22T18:28:49.021Z
 *                       userTaskProgresses:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             userId:
 *                               type: integer
 *                               example: 1
 *                             taskId:
 *                               type: integer
 *                               example: 1
 *                             is_finished:
 *                               type: boolean
 *                               example: false
 *                             completedAt:
 *                               type: string
 *                               format: date-time
 *                               nullable: true
 *       400:
 *         description: Invalid limit parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid limit parameter
 *       500:
 *         description: Failed to fetch tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch tasks
 */



router.get("/:id", verifyRole("educator", "student"), getTaskById);
router.post("/",protect, verifyRole("educator"), taskValidator, uploadTask);
router.put("/:id",protect, verifyRole("educator"), taskValidator, updateTask);
router.delete("/:id",protect,verifyRole("educator"),deleteTaskById);
router.get('/recent/:limit', protect, getRecentTask);

module.exports = router;
