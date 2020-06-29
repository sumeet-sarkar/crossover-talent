const express = require('express');
const router = express.Router();

const verifyAuth = require('../middleware/verifyAuth');

const employeeController = require('../controller/employee');

router.get('/employee/home', verifyAuth, employeeController.home);
router.get('/employee/home/:jobId', employeeController.singleJob);
router.post('/employee/new-application', verifyAuth, employeeController.newApplication);
router.post('/employee/update-bookmarks', verifyAuth, employeeController.updateBoomarks);

module.exports = router;