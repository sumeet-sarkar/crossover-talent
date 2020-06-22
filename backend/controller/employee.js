const getDb = require('../util/database').getDb;

const Jobs = require('../models/jobs');

//Employee Home
exports.home = (req, res, next) => {
    const db = getDb();
    const pageNo = req.query.pageNo || 1;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const {city, category, search} = req.query;
    const query = _queryBuilder(city, category, search);
    let totalItems;
    
    db.collection('jobs').countDocuments(query)
        .then(count => {
            totalItems = count;
            return db.collection('jobs').find(query)
                .skip((pageNo - 1) * itemsPerPage)
                .limit(itemsPerPage)
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

//Update Bookmarks
exports.updatedBoomarks = (req, res, next) => {
    const db = getDb();
    const updatedBoomarks = [];
    const {userId, jobId} = req.body;
    db.collection('user').find({ _id: userId })
        .then(user => {
            updatedBoomarks = user.boomarks
            updatedBoomarks.push(jobId);
            return db.collection('user').update(
                {
                    _id: userId
                },
                {
                    $set: {
                        "bookmarks": updatedBoomarks
                    }
                }
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

//Employee Mock Data
exports.addBulkJobData = (req, res, next) => {
    Jobs.add_bulk_data()
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

exports.dropJobs = (req, res, next) => {
    const db = getDb();
    db.collection('jobs').drop()
        .then(res => {
            res.status(200).send("Dropped all jobs successfully");
        })
        .catch(err => {
            if (!err.statuCode) {
                err.statuCode = 500;
            };
            next(err);
        })
}

exports.refactorJobData = (req, res, next) => {
    Jobs.refactorMockData();
}

const _queryBuilder = (city, category, search) => {
    const query = {};
    if (city || category)
        query['$and'] = [];
    if (search)
        query['$text'] = {};
    if (city)
        query['$and'].push( { city: { $in: city.split(',') } } );
    if (category)
        query['$and'].push( { category: { $in: category.split(',') } } );
    if (search)
        query['$text']['$search'] = search;
    return query;
}