const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer()

const verifyAuth = require('../middleware/verifyAuth');

const adminController = require('../controller/admin');

router.post('/admin/add-bulk-job-data', verifyAuth, upload.single('mock-data'), adminController.addBulkJobData);
router.delete('/admin/delete-job-data', verifyAuth, adminController.dropJobs);

module.exports = router;