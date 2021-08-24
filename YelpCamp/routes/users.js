const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const User = require('../models/user');


router.get('/register', (req, res) => {
    res.render('users/register.ejs');
})

router.post('/register', catchAsync(async (req, res) => {
    const { email, username, password } = req.body
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    console.log(registeredUser)
    req.flash('success', 'Welcome to Yelp camp')
    res.redirect('/campgrounds')
}))

module.exports = router;