const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/moviesApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected');
    })
    .catch (err => {
        console.log(err);
    })

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
})

const Movie = mongoose.model('Movie', movieSchema)

// Movie.insertMany(
//     [
//         {title: 'Amelie', year: 1999},
//         {title: 'Alien', year: 1979},
//         {title: 'The Iron Giant', year: 1999},
//         {title: 'Stand by Me', year: 1923},
//     ]
// )
//     .then(data => {
//         console.log('Inserted');
//         console.log(data);
//     }) 