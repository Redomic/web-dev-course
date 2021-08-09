const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected');
    })
    .catch (err => {
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

const bike = new Product({name: 'Mountain Bike', price: 599});
bike.save()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err._message);
    });

