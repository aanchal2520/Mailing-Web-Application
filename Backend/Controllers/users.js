const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const User = require('../model/user');
const jwt = require("jsonwebtoken");
const dbconnect = require("../databaseConnect");
const validation = require('express-validator');
const { validationResult } = require('express-validator');

const JWT_SECRET = 'nasdad789yad8fdgdfgdfgd7%&f7^R%&R5665f979*T^&7tftydah'; //isko baad me .env file me daalna chahiye

//register api
exports.register = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors.length);

    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const {first, last, email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10);

    // if(password.length < 5) {
    //     return res.json({
    //         status : 'error',
    //         error : 'Password too weak.'
    //     })
    // }
    try {
        // const response = await User.create({
        //     name,
        //     email,
        //     encryptedPass
        // })
        const doc = new User({
          name:{
            first: first,
            last: last
          },
          email: email,
          password: encryptedPass });
        await doc.save();
        
        console.log('User created successfully', doc);
        
    } catch (error) {
        if(error.code === 11000)
            return res.json({ status : 'error', error: 'email already exists' });
        throw error
    }

  res.json({status: 'ok'});

}

//login api
exports.login = async (req, res) => {
  const {email , password } = req.body;
  const user = await User.findOne({email}).lean();

  if(!user){
    return res.json({ status: 'error', error: 'Invalid email/password'});
  }

  if(await bcrypt.compare(password, user.password)){

    const token = jwt.sign(
      { id: user._id , 
        email: user.email
      },
      JWT_SECRET
    )

    return res.json({status: 'ok', data: token });
  }

  res.json({ status:'error' , error: 'Invalid email/password'});

}

