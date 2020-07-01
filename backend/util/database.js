const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
let _client;
//iLoveMongodbMyHobbyIsCoding1234
const mongoConnect = (cb) => {
    MongoClient.connect('mongodb+srv://kudli:iLoveMongodbMyHobbyIsCoding1234@main-qrwun.mongodb.net/crossover-talent?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            console.log("Connected to MongoDb Atlas");
            _db = client.db();
            _client = client;
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

const getClient = () => {
    if (_client) {
        return _client;
    }
    throw "No client found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.getClient = getClient;