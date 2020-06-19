const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');
const getDb = require('./util/database').getDb;

const authRouter = require('./routes/auth');
const employeeRouter = require('./routes/employee');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(authRouter);
app.use(employeeRouter);

app.post('/add-mock-data', (req, res, next) => {
    fs.readFile(path.join(__dirname, 'test_data.txt'), (err, data) => {
        if(!err) {
            test_data = JSON.parse(data);
            const db = getDb();
            db.collection('teachers').insertMany(test_data)
            .then(response => {
                console.log("Inserted Test Data");
                res.status(200).json({ message: "Data successfully uploaded" })
            })
            .catch(err => {
                throw err;
            })
        } else res.status(400).json({ message: "Data upload unsuccessful" })
    })
});

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message: message });
});

mongoConnect(() => {
    app.listen(8080);
    console.log("Listening on port 8080");
})