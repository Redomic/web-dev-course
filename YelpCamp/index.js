const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');

const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')

const ExpressError = require('./utils/ExpressError');

const app = express();

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));


// Routes
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.use('/campgrounds', campgroundRoutes)

app.use('/campgrounds/:id/review', reviewRoutes)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));  
})


// Error Handling
app.use((err, req, res, nex) => {
    if(!err.message) err.message = 'Something went wrong'
    res.render('error.ejs', { err });
})


// Listener
app.listen(3000, () => {
    console.log('Serving at port 3000')
})