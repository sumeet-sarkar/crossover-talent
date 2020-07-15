const Jobs = require('../models/jobs');

const getDb = require('../util/database').getDb;
var ObjectId = require('mongodb').ObjectID;

//Returns all jobs posted by an employer
exports.home = (req, res, next) => {
    const db = getDb();
    const id = req.id;
    let totalCount;
    db.collection('jobs').countDocuments({ createdBy: id })
        .then(count => {
            totalCount = count;
            return db.collection('jobs')
                .find({ createdBy: id })
                .project({ applications: 0 })
                .toArray()
        })
        .then(jobs => {
            res.status(200).json({ count: totalCount, jobs: jobs});
        })
        .catch(err => {
            next(err);
        });
};

//Fetch all applications of a job
exports.getApplications = (req, res, next) => {
    const db = getDb();
    const employerId = req.id;
    const jobId = req.query.job;
    return db.collection('jobs').find({ $and: [{ _id: ObjectId(jobId), "createdBy": employerId }] })
        .project({ applications: 1, _id: 0 })
        .next()
        .then(job => {
            res.status(200).json({ applications: job });
            return res;
        })
        .catch(err => {
            next(err);
            return err
        })
}

//Create a job
exports.createNewJob = (req, res, next) => {
    const newJob = new Jobs(req.body, req.id);
    newJob.save()
        .then(response => {
            res.status(200).json(response);
            return res;
        })
        .catch(err => {
            next(err);
            return err;
        });
}

//Accept or decline a job application
exports.handleApplication = (req, res, next) => {
    const db = getDb();
    const action = req.body.action;
    const employerId = req.id;
    const jobId = req.body.jobId;
    try {
        const actionValues = ["accept", "reject"];
        if (!actionValues.includes(action)) throw new Error("Invalid request");
        if (!employerId || !jobId) throw new Error("Invalid request");
        return db.collection('jobs').updateOne(
            { $and: [{ _id: ObjectId(jobId), "createdBy": employerId }] },
            { $set: { "applications.$.status": action } })
            .then(data => {
                res.status(200).json(data);
                return res;
            })
            .catch(err => {
                next(err);
            });
    } catch (err) {
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

//Update job
exports.updateJob = (req, res, next) => {
    const db = getDb();
    const jobId = req.body.jobId;
    const userId = req.id;
    db.collection('jobs').find({ _id: ObjectId(jobId) })
        .next()
        .then(job => {
            if (job.createdBy === userId) {
                //continue to edit
                const title = req.body.title || job.title;
                return db.collection('jobs').updateOne(
                    { _id: ObjectId(jobId) },
                    { $set: { "title": title } })
            };
            const err = new Error("Unauthorized to make the following changes");
            err.statusCode = 401;
            next(err);
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            next(err);
            return err;
        })
}

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