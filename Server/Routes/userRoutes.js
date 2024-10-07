const { getAllUsers, getMe } = require("../Controllers/userController");
const protect = require('../middlewares/protect');
const { userPreferncesValidator } = require('../utils/validators/prefernecesValidatior');
const { getpreferneces, updatePreferences } = require('../Controllers/userPreferenecsController');
const { getUserActivities, getUserActivity, logUserActivity } = require('../Controllers/activitiesController');
const verifyRole = require("../utils/verifyRole");
const { getUserProfile, updateUserProfile } = require("../Controllers/userProfileController");
const router = require("express").Router();


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get current user information
 *     description: Returns the details of the authenticated user (id, username, email, and role).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 role:
 *                   type: string
 *                   example: admin
 *       401:
 *         description: Unauthorized, user must be authenticated.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/user/preferences:
 *   get:
 *     summary: Get user preferences
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preferences'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   patch:
 *     summary: Update user preferences
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Preferences'
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/activities:
 *   get:
 *     summary: Get user activities
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/activities/{id}:
 *   get:
 *     summary: Get user activity by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Activity not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/activities:
 *   post:
 *     summary: Log user activity
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activityType:
 *                 type: string
 *               activityDetails:
 *                 type: string
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
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         contents:
 *           application/json:
 *             example:
 *               firstName: john
 *               lastName: doe
 *               bio: I am a software engineer
 *               profilePicture: http://example.com/profile.jpg
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   default: john
 *                 lastName:
 *                   type: string
 *                   default: joe
 *                 bio:
 *                   type: string
 *                   default: i am a software engineer 
 *                 profilePicture:
 *                   type: string
 *                   format: binary 
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

router.get("/",protect,verifyRole(['admin']), getAllUsers);
router.get("/me",protect, getMe);

//user preferences routes
router.get("/preferences", protect, getpreferneces);
router.patch("/preferences", protect, userPreferncesValidator, updatePreferences);
// user activities routes
router.get('/activities',protect, getUserActivities);
router.get('/activities/:id',protect, getUserActivity);
router.post("/activities",protect,logUserActivity);
// user profile routes
router.get("/profile", protect, getUserProfile);
router.patch("/profile", protect, updateUserProfile);

module.exports = router;


