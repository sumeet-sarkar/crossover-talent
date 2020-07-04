const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(process.mainModule.filename), './resume'));
    },
    filename: function(req, file, cb) {
        cb(null, `${req.id}.pdf`);
    }
});
const upload = multer({ storage: storage });

const verifyAuth = require('../middleware/verifyAuth');

const employeeController = require('../controller/employee');

router.get('/employee/home', verifyAuth, employeeController.home);
router.get('/employee/home/:jobId', verifyAuth, employeeController.singleJob);
router.get('/employee/my-applications', verifyAuth, employeeController.myApplications);
router.post('/employee/new-application', verifyAuth, employeeController.newApplication);
router.post('/employee/update-bookmarks', verifyAuth, employeeController.updateBoomarks);
router.post('/employee/upload-resume', verifyAuth, upload.single('resume'), employeeController.uploadResume);

module.exports = router;