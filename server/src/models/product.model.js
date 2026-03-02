const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add product title'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please add product price']
    },
    category: {
        type: String,
        required: [true, 'Please add product category'],
        enum: ['Fruits', 'Vegetables', 'Fast Food', 'Dairy', 'Bakery', 'Beverages']
    },
    image: {
        type: String,
        required: [true, 'Please add product image URL']
    },
    description: {
        type: String,
        required: [true, 'Please add product description']
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
