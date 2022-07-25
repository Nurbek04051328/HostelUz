const bcrypt = require('bcrypt');
const User = require("../models/User");
const createError = require("../utils/error");
const jwt = require('jsonwebtoken');

const register  = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 7)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save();
        res.status(200).send("Пользователь создан.")
    } catch(err) {
        next(err)
    }
}
const login  = async (req, res, next) => {
    try {
        const user = await User.findOne({username:req.body.username});
        if (!user) return next(createError(404, "Пользователь не найден"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Парол не правилно"))

        const token = jwt.sign({ id:user._id, isAdmin:user.isAdmin }, process.env.secret_key);
        console.log((token));
        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails})
    } catch(err) {
        next(err)
    }
}

module.exports = {register, login}

