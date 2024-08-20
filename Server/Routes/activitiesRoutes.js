const verifyRole = require('../utils/verifyRole');
const { getActivities, getActivity } = require('../Controllers/activitiesController');

const router = require("express").Router();

// I don't think this resourse can be public so i limited it for admin.

router.get('/',verifyRole('admin'), getActivities);
router.get('/:id',verifyRole('admin'), getActivity);

module.exports = router;
