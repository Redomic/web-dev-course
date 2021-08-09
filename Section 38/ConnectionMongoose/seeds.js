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

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save()
//     .then(p => {
//         console.log(p);
//     })
//     .catch(err => {
//         console.log(err);
//     })

const newProds = [
    {
        name: 'Some Fruit',
        price: 1.00,
        category: 'fruit'
    },
    {
        name: 'Some Vegetable',
        price: 3.99,
        category: 'vegetable'
    },
    {
        name: 'Some dairy',
        price: 9.99,
        category: 'dairy'
    }
]

Product.insertMany(newProds, )
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })