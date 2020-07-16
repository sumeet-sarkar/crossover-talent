const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dotenv = require('dotenv');
dotenv.config();

let _db;
let _client;
//iLoveMongodbMyHobbyIsCoding1234
const mongoConnect = (cb) => {
    let db;
    if (process.env.NODE_ENV == 'dev') db = 'crossover-talent' ;
    if (process.env.NODE_ENV == "test") {
        db = 'TEST';
    };
    console.log(`Connecting to MongoDb ${db} database`);
    return MongoClient.connect(`mongodb+srv://kudli:iLoveMongodbMyHobbyIsCoding1234@main-qrwun.mongodb.net/${db}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            _db = client.db();
            _client = client;
            cb();
            return;
        })
        .catch(err => {
            return err;
        })
};

const getDb = () => {
    if(_db) {
        return _db;
    } 
    return new Error("No database Found"); 
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