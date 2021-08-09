const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')

const mongoose = require('mongoose');
const Product = require('./models/product.js')

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo connection open");
    })
    .catch((err) => {
        console.log('Something went wrong: ');
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy']

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index.ejs', {products})
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/products')
})

app.get('/products/new', async (req, res) => {
    res.render('products/new.ejs', { categories })
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show.ejs', {product});
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit.ejs', { product, categories })
})

app.listen(3000, () => {
    console.log('App is listening at port 3000')
})  