const verifyRole = require('../utils/verifyRole');
const { getActivities, getActivity } = require('../Controllers/activitiesController');
const protect = require('../middlewares/protect');

const router = require("express").Router();

// I don't think this resource can be public so I limited it for admin.
/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get all activities
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserActivity'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/activities/{id}:
 *   get:
 *     summary: Get an activity by ID
 *     tags: 
 *       - Activities
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the activity
 *     responses:
 *       '200':
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserActivity'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

router.get('/',protect, verifyRole(['admin']), getActivities);
router.get('/:id',protect, verifyRole(['admin']), getActivity);

module.exports = router;
