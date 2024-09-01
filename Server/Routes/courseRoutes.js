const {createCourse, getAllCourses, getCourseById, updateCourse, deleteCourseById, getCourseDetails} = require('../Controllers/courseController');
const verifyRole = require('../utils/verifyRole');
const {courseValidator} = require('../utils/validators/courseValidator');
const courseProgressRoutes = require('./courseProgressRoutes');
const protect = require('../middlewares/protect');
const progressRoutes = require('./courseProgressRoutes');  
const router = require('express').Router();


/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       '201':
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 * 
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Course not found
 *       '500':
 *         description: Internal server error
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       '200':
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Course not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course
 *     responses:
 *       '204':
 *         description: Course deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Course not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/courses/{courseId}/details:
 *   get:
 *     summary: Get course details with optional user progress
 *     description: Fetches the details of a specific course, including lectures and tasks. User progress is included if the user is enrolled in the course.
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the course to retrieve details for
 *     responses:
 *       200:
 *         description: Course details with lectures, tasks, and optional user progress
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: ajax
 *                 description:
 *                   type: string
 *                   example: Learn about making better connections to your app without refreshing
 *                 educatorId:
 *                   type: integer
 *                   example: 1
 *                 lecturesCount:
 *                   type: integer
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-08-22T18:28:48.996Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-08-22T18:28:48.996Z
 *                 lectures:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-08-26T14:34:00.968Z
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-27T14:34:00.968Z
 *                       type:
 *                         type: string
 *                         example: online
 *                       text:
 *                         type: string
 *                         example: Lecture 1 in course
 *                       recordedLink:
 *                         type: string
 *                         example: http://nowhere
 *                       onlineLink:
 *                         type: string
 *                         nullable: true
 *                       order:
 *                         type: integer
 *                         example: 1
 *                       estimatedTime:
 *                         type: integer
 *                         example: 0
 *                       attended:
 *                         type: boolean
 *                         example: true
 *                       progress:
 *                         type: number
 *                         format: float
 *                         example: 1.0
 *                       tasks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             type:
 *                               type: string
 *                               example: text
 *                             description:
 *                               type: string
 *                               example: Task 1
 *                             text:
 *                               type: string
 *                               example: Solve the next problem
 *                             testcases:
 *                               type: string
 *                               nullable: true
 *                             options:
 *                               type: string
 *                               nullable: true
 *                             startTime:
 *                               type: string
 *                               format: date-time
 *                               example: 2024-08-10T08:15:00.000Z
 *                             endTime:
 *                               type: string
 *                               format: date-time
 *                               example: 2024-09-10T08:15:00.000Z
 *                             isFinished:
 *                               type: boolean
 *                               example: false
 *                             completedAt:
 *                               type: string
 *                               format: date-time
 *                               nullable: true
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Course not found
 *       500:
 *         description: Failed to fetch course details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Failed to fetch course details
 */


//progress Routes
router.use("/", progressRoutes);

router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// protected Routes
router.post("/",protect, verifyRole("educator"),courseValidator, createCourse);
router.patch("/:id",protect, verifyRole("educator"), updateCourse);
router.delete("/:id",protect, verifyRole("educator"),deleteCourseById);
router.get('/:courseId/details',protect, getCourseDetails);

// Course's progress Routes
router.use('/',courseProgressRoutes);

module.exports = router;
