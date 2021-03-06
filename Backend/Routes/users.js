const express = require('express');
const { check, validationResult } = require('express-validator');
const { login, register } = require("../Controllers/users");
const router = express.Router();


//login api
router.post('/login', [
    check('email').exists().withMessage('Email required'),
    check('password').exists().withMessage('Password required')
], login)

//register api
router.post('/register', [
    check('first').exists().withMessage('First Name required'),
    check('last').exists().withMessage('last Name required'),
    check('email').exists().withMessage('Email required'),
    check('password').exists().withMessage('Password required'),
    check('confirmPassword').exists().withMessage('Re-entered password required')
], register)

module.exports = router;