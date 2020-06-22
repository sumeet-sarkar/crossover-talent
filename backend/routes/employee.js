const express = require('express');
const router = express.Router();

const verifyAuth = require('../middleware/verifyAuth');

const employeeController = require('../controller/employee');

router.get('/employee/home', verifyAuth, employeeController.home);
router.get('/employee/update-bookmarks', verifyAuth, employeeController.updatedBoomarks);
router.get('/employee/add-bulk-jobData', verifyAuth, employeeController.addBulkJobData);
router.get('/employee/delete-jobData', verifyAuth, employeeController.dropJobs);
router.get('/employee/refactor-jobData', verifyAuth, employeeController.refactorJobData);

module.exports = router;