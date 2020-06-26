const getDb = require('../util/database').getDb;

const Jobs = require('../models/jobs');

//Employee Home
exports.home = (req, res, next) => {
    const db = getDb();
    const pageNo = req.query.pageNo || 1;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const {city, category, minSalary, maxSalary, search} = req.query;
    const query = _queryBuilder(city, category, minSalary, maxSalary, search);
    let totalItems;
    
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

//Update Bookmarks
exports.updateBoomarks = (req, res, next) => {
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