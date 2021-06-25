const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const User = require('../model/user');
//const jwt = require("jsonwebtoken");
const dbconnect = require("../databaseConnect");
const validation = require('express-validator');
const { validationResult } = require('express-validator');

//register api
exports.register = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors.length);

    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10);

    // if(password.length < 5) {
    //     return res.json({
    //         status : 'error',
    //         error : 'Password too weak.'
    //     })
    // }

    try {
        const response = await User.create({
            email,
            encryptedPass
        })
        console.log('User created successfully', response);
    } catch (error) {
        if(error.code === 11000)
            return res.json({ status : 'error', error: 'email already exists' });
        
        throw error
    }

    res.status({ status: 'ok' })
}

//login api
exports.login = (req, res) => {

}

