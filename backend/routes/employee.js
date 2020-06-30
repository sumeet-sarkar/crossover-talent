const express = require('express');
const router = express.Router();

const verifyAuth = require('../middleware/verifyAuth');

const employeeController = require('../controller/employee');

router.get('/employee/home', verifyAuth, employeeController.home);
router.get('/employee/home/:jobId', verifyAuth, employeeController.singleJob);
router.get('/employee/my-applications', verifyAuth, employeeController.myApplications);
router.post('/employee/new-application', verifyAuth, employeeController.newApplication);
router.post('/employee/update-bookmarks', verifyAuth, employeeController.updateBoomarks);

module.exports = router;