const express = require('express');
const router = express.Router();

const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')

const catchAsync = require('../utils/catchAsync');

const Campground = require('../models/campground');


router.get('/',  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index.ejs', { campgrounds });
}))

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new Campground')
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new.ejs');
})

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews').populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found')
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/show.ejs', { campground });
}))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, {...req.body.campground})
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${id}`);
}))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground not found')
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit.ejs', { campground });
}))

module.exports = router;