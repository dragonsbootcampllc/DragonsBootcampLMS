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


//progress Routes
router.use("/", progressRoutes);

router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// protected Routes
router.post("/",protect, verifyRole("educator"),courseValidator, createCourse);
router.put("/:id",protect, verifyRole("educator"), updateCourse);
router.delete("/:id",protect, verifyRole("educator"),deleteCourseById);
router.get('/:courseId/details',protect, getCourseDetails);

// Course's progress Routes
router.use('/',courseProgressRoutes);

module.exports = router;
