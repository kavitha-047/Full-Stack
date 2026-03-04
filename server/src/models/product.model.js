const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

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
        enum: ['Fruits', 'Vegetables', 'Fast Food', 'Dairy', 'Bakery', 'Beverages', 'Staples', 'Snacks', 'Spices']
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
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
