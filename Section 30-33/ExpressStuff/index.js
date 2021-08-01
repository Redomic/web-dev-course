const express = require('express'); 
const app = express();
const port = 3000;

// app.use((req, res) => {
//     console.log('Respond Requested');
//     // res.send({user: 'REDOMIC'});
// })

// app.get('/', (req, res) => {
//     res.send({animal: null});
// })

// app.get('/cats', (req, res) => {
//     res.send({animal: "cat"});
// })

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`Browsing ${subreddit}`)
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    res.send(`Query: ${q}`);
});

// app.get('/dogs', (req, res) => {
//     res.send({animal: "dog"});
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

