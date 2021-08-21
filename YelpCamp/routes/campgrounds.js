const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');


const Campground = require('../models/campground');

const { campgroundSchema } = require('../schemas.js')

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.get('/',  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index.ejs', { campgrounds });
}))

router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made a new Campground')
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/new', (req, res) => {
    res.render('campgrounds/new.ejs');
})

router.get('/:id',  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    res.render('campgrounds/show.ejs', { campground });
}))

router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${id}`);
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

router.get('/:id/edit',  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit.ejs', { campground });
}))

module.exports = router;