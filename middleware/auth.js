require('dotenv').config();
const jwt = require('jsonwebtoken');
const key = process.env.TOKENKEY;

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.isAuth = false;
        return next()
    }

    const token = authHeader.split(' ')[1];
    let decodedToken
    try{
        decodedToken = jwt.verify(token, key);
    } catch (err) {
        req.isAuth = false;
        console.log(err)
        next()
    }
    if (decodedToken) {
        req.userId = decodedToken.userId
        req.isAuth = true
        next()
    }
}