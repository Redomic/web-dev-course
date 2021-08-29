const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });

const users = require('../controllers/users')

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const User = require('../models/user');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(catchAsync(users.renderLogin))
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), catchAsync(users.login))

router.get('/logout',  users.logout)

module.exports = router;