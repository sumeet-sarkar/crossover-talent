const getDb = require('../util/database').getDb;
const Application = require('../models/application');

const Jobs = require('../models/jobs');

//Employee Home
exports.home = (req, res, next) => {
    const pageNo = req.query.pageNo || 1;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const {city, category, minSalary, maxSalary, search} = req.query;
    const query = _queryBuilder(city, category, minSalary, maxSalary, search);
    let totalItems;
    const db = getDb();
    db.collection('jobs').countDocuments(query)
        .then(count => {
            totalItems = count;
            return db.collection('jobs').find(query)
                .skip((pageNo - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .sort({ "city": 1 })
                .toArray()
        })
        .then(jobs => {
            res.status(200).json({totalItems: totalItems, jobs: jobs });
        })
        .catch(err => {
            if (!err.statuCode) {
                err.statuCode = 500;
            };
            next(err);
        })
};


//Update new application from user
exports.newApplication = (req, res, next) => {
    //Save ID's of user and job
    const jobId = req.body.jobId;
    const userId = req.body.userId;
    const application = new Application({ userId: userId });

    //Check if ID's aren't null
    if (userId && jobId) {
        //Update Job's application field
        application.updateJobs(jobId)
            .then(result => {
                if (result.result.nModified == 1) {
                    //Update User's application field
                    return application.updateUser(jobId)
                }
                const err = new Error("Couldn't update jobs")
                err.statuCode = 500;
                throw err;
            })
            .then((result) => {
                res.status(200).send(result);
            })
            .catch(err => {
                next(err);
            })
    } else {
        const err = new Error("Please provide valid details");
        err.statuCode = 500;
        throw err;
    }
}

//Update Bookmarks(not tested)
exports.updateBoomarks = (req, res, next) => {
    const db = getDb();
    const {userId, jobId} = req.body;
    const updatedBoomarks = [jobId];
    db.collection('user').find({ _id: userId })
        .then(user => {
            updatedBoomarks = user.bookmarks
            updatedBoomarks.push(jobId);
            return db.collection('user').update(
                { _id: userId },
                { $set: { "bookmarks": updatedBoomarks } }
            )
        })
        .then(res => {
            console.log(res);
            res.status(200).send("Updated Bookmarks");
        })
        .catch(err => {
            if (!err.statuCode) {
                err.statuCode = 500;
            };
            next(err);
        })
}

const _queryBuilder = (city, category, minSalary, maxSalary, search) => {
    const query = {};

    if (city || category || minSalary || maxSalary)
        query['$and'] = [];

    if (city) {
        query['$and'].push( { city: { $in: city.split(',') } } );
    }

    if (category)
        query['$and'].push( { category: { $in: category.split(',') } } );

    if (minSalary)
        query['$and'].push( { salary: { $gt: minSalary } });

    if (maxSalary)
        query['$and'].push( { salary: { $lt: maxSalary } })

    if (search) {
        query['$text'] = {};
        query['$text']['$search'] = search;
    }

    return query;
}