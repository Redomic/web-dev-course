const express = require('express');
const redditData = require('./data.json');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/cats', (req, res) => {
    const cats = ['Blue', 'Green', 'Red', 'Rocket', 'Winston'];
    res.render('cats.ejs', { cats });
})

app.get('/rand', (req, res) => {
    const rand = Math.floor(Math.random() * 10) + 1;
    res.render('random.ejs', {rand});
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const capitalize = (s) => {
        return s[0].toUpperCase() + s.slice(1);
    }
    const data = redditData[subreddit];
    res.render('subreddit.ejs', { data, capitalize });
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})