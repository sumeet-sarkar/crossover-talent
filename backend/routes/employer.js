const express = require('express');
const router = express.Router();

const verifyAuth = require('../middleware/verifyAuth');
const employerRouter = require('../controller/employer');

router.get('/employer/home', verifyAuth, employerRouter.home);
router.put('/employer/change-job-status', verifyAuth, employerRouter.changeJobStatus);
router.put('/employer/delete-job', verifyAuth, employerRouter.deleteJob);
router.put('/employer/handle-application', verifyAuth, employerRouter.handleApplication);

module.exports = router;