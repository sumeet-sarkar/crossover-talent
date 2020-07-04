const Jobs = require('../models/jobs');

const getDb = require('../util/database').getDb;
var ObjectId = require('mongodb').ObjectID;

//Returns all jobs posted by an employer
exports.home = (req, res, next) => {
    const db = getDb();
    const id = req.id;
    let totalCount;
    db.collection('test').countDocuments({ employer: id })
        .then(count => {
            totalCount = count;
            return db.collection('test').find({ employer: id }).toArray()
        })
        .then(jobs => {
            res.status(200).json({ count: totalCount, jobs: jobs});
        })
        .catch(err => {
            next(err);
        });
};

//Accept or decline a job application
exports.handleApplication = (req, res, next) => {
    const db = getDb();
    const action = req.body.action;
    const userId = req.id;
    const jobId = req.body.jobId;
    try {
        if (action != "accept" || "reject") throw new Error("Invalid request");
        if (!userId || !jobId) throw new Error("Invalid request");
        db.collection('test').updateOne(
            { $and: [{ _id: ObjectId(jobId), "applications.userId": userId }] },
            { $set: { "applications.$.status": action } })
            .then(data => {
                res.status(200).json(data);
                return res;
            })
            .catch(err => {
                throw err;
            });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    };
};

//Change status of existing job
exports.changeJobStatus = (req, res, next) => {
    const userId = req.id;
    const jobId = req.body.jobId;
    const status = req.body.status;
    Jobs.changeStatus(jobId, userId, status)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

//Delete existing job
exports.deleteJob = (req, res, next) => {
    const userId = req.id;
    const jobId = req.body.jobId;
    Jobs.delete(jobId, userId)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};