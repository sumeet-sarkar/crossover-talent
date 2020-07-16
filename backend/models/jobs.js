const getDb = require('../util/database').getDb;
var ObjectId = require('mongodb').ObjectID;

class Jobs {
    constructor(props, userId) {
        this.company = props.company || "Test",
        this.title = props.title || "Test",
        this.description = props.description || "Test",
        this.soft_skills = props.softSkills || [],
        this.technical_skills = props.technicalSkills || [],
        this.city = props.city,
        this.category = props.category,
        this.logo = props.logo,
        this.minSalary = props.minSalary,
        this.maxSalary = props.maxSalary,
        this.showSalary = props.showSalary || false,
        this.currency = props.currency,
        this.currencySymbol = props.currencySymbol,
        this.applications = [],
        this.bookmarks = [],
        this.createdBy = userId,
        this.status = props.status || "open",
        this.dateTime = new Date().toISOString,
        this.sponsored = props.sponsored || false,
        this.employer = props.employer || []
    };

    save() {
        const db = getDb();
        return db.collection('jobs').insertOne(this);
    }

    static changeStatus(jobId, userId, status) {
        const db = getDb();
        return db.collection('jobs').updateOne(
            { $and: [{ _id: ObjectId(jobId), "createdBy": userId }] },
            { $set: { "status": status } } );
    }

    static delete(jobId, userId) {
        const db = getDb();
        return db.collection('jobs').updateOne(
            { $and: [{ _id: ObjectId(jobId), "createdBy": userId }] },
            { $set: { "isDeleted": true } } );
    }

    static add_bulk_data(data) {
        const db = getDb();
        return db.collection('jobs').insertMany(data)
            .then(res => {
                console.log("Added jobs data in bulk");
            })
            .catch(err => {
                throw err;
            })
    };
};

module.exports = Jobs;