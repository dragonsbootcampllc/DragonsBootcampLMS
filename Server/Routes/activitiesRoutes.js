const verifyRole = require('../utils/verifyRole');
const { getActivities, getActivity } = require('../Controllers/activitiesController');

const router = require("express").Router();

// I don't think this resourse can be public so i limited it for admin.

router.route('/').get(verifyRole('educator'), getActivities);
router.route('/:activityId').get(verifyRole('educator'), getActivity);

module.exports = router;
