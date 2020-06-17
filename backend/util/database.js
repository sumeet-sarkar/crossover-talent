const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
//iLoveMongodbMyHobbyIsCoding1234
const mongoConnect = (cb) => {
    MongoClient.connect('mongodb+srv://kudli:iLoveMongodbMyHobbyIsCoding1234@main-qrwun.mongodb.net/crossover-talent?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            console.log("Connected to MongoDb Atlas");
            _db = client.db();
            cb();
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

const getDb = () => {
    if(_db) {
        return _db;
    } 
    throw "No database Found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;