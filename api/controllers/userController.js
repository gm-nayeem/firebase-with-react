const User = require("../models/User");

const userCreate = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save();

        res.status(201).send({
            sucess: true,
            user: newUser
        });
    } catch (err) {
        next(err);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).send({
            sucess: true,
            users
        });
    } catch (err) {
        next(err);
    }
};



module.exports = {
    userCreate,
    getUsers
}