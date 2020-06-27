const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const employeeRouter = require('./routes/employee');

const mongoConnect = require('./util/database').mongoConnect;

//Initialize application
const app = express();

//Middlewares
app.use(bodyparser.json());

app.use(cookieParser());

//CORS Handler
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(authRouter);
app.use(employeeRouter);
app.use(adminRouter);

app.use('/', (req, res, next) => {
    res.status(404).send('Page not found');
})

//Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message: message });
});

//Database Connection
mongoConnect(() => {
    app.listen(8080);
    console.log("Listening on port 8080");
});