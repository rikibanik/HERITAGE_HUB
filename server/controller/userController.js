const { validationResult, ExpressValidator } = require('express-validator');
const userModel = require('../db/models/userModel');
const blackList = require('../db/models/blacklistToken');
const userService = require('../services/userService');


module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: await userModel.hashPassword(req.body.password)
    };
    const result = await userService.registerUser(user);
    res.cookie('token', result.token).status(201).json({ result });

};
module.exports.loginUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    const result = await userService.loginUser(user);
    console.log(result.token)
    res.cookie('token', result.token)
    res.status(201).json({ result });
}

