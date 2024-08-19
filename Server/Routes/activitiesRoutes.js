const verifyRole = require('../utils/verifyRole');
const { getActivities, getActivity } = require('../Controllers/activitiesController');

const router = require("express").Router();

// I don't think this resourse can be public so i limited it for admin.

router.route('/').get(verifyRole('admin'), getActivities);
router.route('/:id').get(verifyRole('admin'), getActivity);

module.exports = router;
