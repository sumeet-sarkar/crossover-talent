const getDb = require('../util/database').getDb;
var ObjectId = require('mongodb').ObjectID;

class Jobs {
    constructor(props) {
        this.company = props.company,
        this.title = props.title,
        this.description = props.description,
        this.skills = props.skills,
        this.location = props.location,
        this.category = props.category,
        this.logo = props.logo,
        this.salary = props.salary,
        this.currency = props.currency,
        this.currencySymbol = props.currencySymbol,
        this.applications = []
    };

    save() {
        const db = getDb();
        return db.collection('jobs').insertOne(this)
            .then(res => {
                console.log("Added job successfully");
            })
            .catch(err => {
                throw err;
            })
    }

    static changeStatus(jobId, userId, status) {
        const db = getDb();
        return db.collection('test').updateOne(
            { $and: [{ _id: ObjectId(jobId), "createdBy": userId }] },
            { $set: { "status": status } } );
    }

    static delete(jobId, userId) {
        const db = getDb();
        return db.collection('test').updateOne(
            { $and: [{ _id: ObjectId(jobId), "createdBy": userId }] },
            { $set: { "isDeleted": true } } );
    }

    static add_bulk_data(data) {
        const db = getDb();
        return db.collection('test').insertMany(data)
            .then(res => {
                console.log("Added jobs data in bulk");
            })
            .catch(err => {
                throw err;
            })
    };
};

module.exports = Jobs;