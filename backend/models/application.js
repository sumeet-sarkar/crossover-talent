const getDb = require('../util/database').getDb;
var ObjectId = require('mongodb').ObjectID;


class Application {
    constructor(props) {
        this.userId = props.userId,
        this.status = 'pending',
        this.isDeleted = false,
        this.dateTime = new Date().toLocaleString()
    }

    updateUser = (jobId) => {
        const db = getDb();
        return new Promise((resolve, reject) => {
            db.collection('user').updateOne(
                { "_id" : ObjectId(this.userId) },
                { "$push" : { "applications": jobId } },
                function( err, result ) {
                    if ( err ) {
                        return reject(err);
                    } else {
                        console.log("updated user");
                        return resolve(result);
                    }
                }
            )
        })
    };

    updateJobs = (jobId) => {
        const db = getDb();
        return new Promise((resolve, reject) => {
            db.collection('jobs').updateOne(
                { "_id" : ObjectId(jobId) },
                { "$push" : { "applications": this } },
                function( err, result ) {
                    if ( err ) {
                        return reject();
                    } else {
                        console.log("updated job");
                        return resolve(result);
                    }
                }
            )
        })
    };
}

module.exports = Application;