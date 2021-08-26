const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const User = require('../models/user');


router.get('/register', (req, res) => {
    res.render('users/register.ejs');
})

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp camp')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}))

router.get('/login', catchAsync(async (req, res) => {
    res.render('users/login.ejs')
}))

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), catchAsync(async (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    req.flash('success', 'Welcome back!')
    res.redirect(redirectUrl)
}))

router.get('/logout',  (req, res) => {
    req.logout();
    req.flash('success', 'Logged out');
    res.redirect('/campgrounds');
})

module.exports = router;