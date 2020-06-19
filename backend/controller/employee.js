const getDb = require('../util/database').getDb;
const mock_data = require('../../MOCK_DATA.json');

exports.home = (req, res, next) => {
    const db = getDb();
    //res.status(200).send({ message: "Successful" });
    db.collection('jobs').find().toArray()
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
}