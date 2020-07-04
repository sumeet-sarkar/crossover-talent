const getDb = require('../util/database').getDb;

const Jobs = require('../models/jobs');
const bodyParser = require('body-parser');

//Employee Mock Data
exports.addBulkJobData = (req, res, next) => {
    const file = req.file.buffer.toString('utf8');
    const data = JSON.parse(file);
    Jobs.add_bulk_data(data)
        .then(r => {
            res.status(200).send("Added jobs data in bulk")
        })
        .catch(err => {
            if (!err.statuCode) {
                err.statuCode = 500;
            };
            next(err);
        })
};

//Delete all jobs
exports.dropJobs = (req, res, next) => {
    const db = getDb();
    db.collection('test').drop()
        .then(result => {
            res.status(200).send("Dropped all jobs successfully");
        })
        .catch(err => {
            if (!err.statuCode) {
                err.statuCode = 500;
            };
            next(err);
        })
};