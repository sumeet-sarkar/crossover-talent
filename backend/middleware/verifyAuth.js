const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error("Token Required");
        error.statusCode = 401;
        throw error;
    }
    const encodedToken = authHeader.split(' ')[1];
    let token;
    try {
        token = jwt.verify(encodedToken, 'secret');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!token) {
        const error = new Error("Not Authenticated");
        error.statusCode = 401;
        throw error;
    }
    req.id = token.id;
    next();
}