const jwt = require('jsonwebtoken');
const { verify } = require("jsonwebtoken");
const createError = require('./error')


const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "Foydalanuvchi avtorizatsiyadan utmagan"))
    }
    jwt.verify(token, process.env.secret_key, (err, user)=> {
        if (err) return next(createError(403, "Token yaroqli emas!"));
        req.user = user
        next()
    })
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "Siz avtorizatsiyadan utmagansiz!"));
        }
    })
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "Siz avtorizatsiyadan utmagansiz!"));
        }
    })
}

module.exports = {verifyToken, verifyUser, verifyAdmin}