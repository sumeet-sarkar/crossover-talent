const express = require('express');
const router = express.Router();

const verifyAuth = require('../middleware/verifyAuth');
const employerRouter = require('../controller/employer');

router.get('/employer/home', verifyAuth, employerRouter.home);
router.get('/employer/get-applications', verifyAuth, employerRouter.getApplications);
router.post('/employer/new-job', verifyAuth, employerRouter.createNewJob);
router.put('/employer/change-job-status', verifyAuth, employerRouter.changeJobStatus);
router.put('/employer/update-job', verifyAuth, employerRouter.updateJob);
router.put('/employer/delete-job', verifyAuth, employerRouter.deleteJob);
router.put('/employer/handle-application', verifyAuth, employerRouter.handleApplication);

module.exports = router;