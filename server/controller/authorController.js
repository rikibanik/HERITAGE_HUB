const { validationResult, ExpressValidator } = require('express-validator');
const authorModel = require('../db/models/authorModel');
const blackList = require('../db/models/blacklistToken');
const authorService = require('../services/authorService');


module.exports.loginAuthor = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const author= {
        email: req.body.email,
        password: req.body.password
    }
    const isAuthor = await authorModel.findOne({email: author.email}).select('+password');
    if(!isAuthor){
        return res.status(400).json("INVALID CREDENTIAL");
    }
    const isMatch = await isAuthor.comparePassword(author.password);
    if(!isMatch){
        return res.status(400).json("INVALID CREDENTIAL");
    }
    const token = await isAuthor.generateAuthToken();
    res.cookie('token',token);
    res.status(201).redirect('/author/dashboard')

}