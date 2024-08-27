const {  markLectureAsAttended } = require('../Controllers/lectureController');
const protect = require("../middlewares/protect");
const router = require("express").Router();


/**
 * @swagger
 * /api/lectures/{lectureId}/attend:
 *   post:
 *     summary: Mark a lecture as attended
 *     description: This endpoint marks a specific lecture as attended.
 *     tags: [Lectures]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         required: true
 *         description: The ID of the lecture to be marked as attended
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Lecture marked as attended successfully 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lectureProgress:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the task progress record
 *                     userId:
 *                       type: integer
 *                       description: The ID of the user
 *                     lectureId:
 *                       type: integer
 *                       description: The ID of the lecture
 *                     progress:
 *                       type: integer
 *                       description: The progress percentage of the lecture
 *                     attended:
 *                       type: boolean
 *                       description: Indicates whether the lecture was attended
 *                     completionDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the lecture was completed
 *                     courseId:
 *                       type: integer
 *                       description: The ID of the course
 *                     createdat:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the record was created
 *                     updatedat:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the record was last updated
 *                 progressPercentage:
 *                   type: integer
 *                   description: The overall progress percentage for the lecture
 *                 tasksInLecture:
 *                   type: integer
 *                   description: The number of tasks in the lecture
 *                 tasksPercentage:
 *                   type: integer
 *                   description: The completion percentage of tasks in the lecture
 *       '400':
 *         description: Lecture ID or User ID is missing
 *       '403':
 *         description: User is not enrolled in the course
 *       '404':
 *         description: No lecture was found with this ID
 *       '500':
 *         description: Failed to mark lecture as attended
 */



router.post("/:lectureId/attend", protect, markLectureAsAttended);

module.exports = router;
