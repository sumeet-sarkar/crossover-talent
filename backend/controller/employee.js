const getDb = require('../util/database').getDb;
const mock_data = require('../../MOCK_DATA.json');

//Employee Home
exports.home = (req, res, next) => {
    const pageNo = req.query.pageNo || 1;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const db = getDb();

    let totalItems;
    db.collection('jobs').countDocuments()
        .then(count => {
            totalItems = count;
            return db.collection('jobs').find()
                .skip((pageNo - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .toArray()
        })
        .then(jobs => {
            res.status(200).json(jobs);
        })
        .catch(err => {
            if (!err.statuCode) {
                err.statuCode = 500;
            };
            next(err);
        })
};

//Employee Mock Data
exports.add_data = (req, res, next) => {
    const db = getDb();
    db.collection('jobs').insertMany(mock_data)
        .then(jobs => {
            res.status(200).json({ message: "Inserted job documents" });
        })
        .catch(err => {
            if (!err.statuCode) {
                err.statuCode = 500;
            };
            next(err);
        })
};