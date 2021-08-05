const express = require('express');
const commentData = require('./data.json');
const { v4: uuid } = require('uuid');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/tacos', (req, res) => {
    res.send('Get /tacos response');
})

app.post('/tacos', (req, res) => {
    console.log(req.body);
    res.send('Post /tacos response');
})

app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', { commentData });
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    commentData.push({ id: uuid(), username, comment });
    res.redirect('/comments');
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new.ejs', { commentData });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const filteredComment = commentData.find(c => c.id === id);
    res.render('comments/edit.js', { filteredComment })
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const filteredComment = commentData.find(c => c.id === id);
    res.render('comments/show.ejs',  {filteredComment})
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const filteredComment = commentData.find(c => c.id === id);
    filteredComment.comment = newCommentText;
    res.redirect('/comments');
})



app.listen(3000, () => {
    console.log('listening on port 3000');
})