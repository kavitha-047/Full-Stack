const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/product.model');
const User = require('../models/user.model');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const products = [
    {
        title: 'Organic Bananas',
        price: 0.99,
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?auto=format&fit=crop&q=80&w=400',
        description: 'Fresh organic bananas from local farms.',
        stock: 100
    },
    {
        title: 'Red Bell Pepper',
        price: 1.49,
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1563513307168-a510c9d5718e?auto=format&fit=crop&q=80&w=400',
        description: 'Crunchy and sweet red bell peppers.',
        stock: 50
    },
    {
        title: 'Crunchy Chicken Burger',
        price: 5.99,
        category: 'Fast Food',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
        description: 'Crispy chicken patty with fresh lettuce and mayo.',
        stock: 20
    },
    {
        title: 'Alphonso Mangoes',
        price: 4.99,
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400',
        description: 'Sweet and juicy Alphonso mangoes.',
        stock: 40
    },
    {
        title: 'Fresh Broccoli',
        price: 1.99,
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=400',
        description: 'Healthy green broccoli florets.',
        stock: 60
    },
    {
        title: 'Pepperoni Pizza',
        price: 8.99,
        category: 'Fast Food',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400',
        description: 'Classic pepperoni pizza with mozzarella cheese.',
        stock: 15
    },
    {
        title: 'Greek Yogurt',
        price: 2.49,
        category: 'Dairy',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
        description: 'Creamy high-protein Greek yogurt.',
        stock: 80
    },
    {
        title: 'Whole Wheat Bread',
        price: 2.99,
        category: 'Bakery',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
        description: 'Freshly baked whole wheat bread.',
        stock: 30
    },
    {
        title: 'Cold Brew Coffee',
        price: 3.49,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=400',
        description: 'Refreshing bottled cold brew coffee.',
        stock: 100
    },
    {
        title: 'Stawberries',
        price: 3.99,
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1464960350410-85f7ea1e1e4a?auto=format&fit=crop&q=80&w=400',
        description: 'Sweet and succulent red strawberries.',
        stock: 45
    },
    {
        title: 'Baby Spinach',
        price: 1.79,
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
        description: 'Fresh tender baby spinach leaves.',
        stock: 70
    },
    {
        title: 'Tacos Al Pastor',
        price: 6.49,
        category: 'Fast Food',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
        description: 'Authentic pork tacos with pineapple.',
        stock: 25
    }
];

const seedData = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/grocery-app';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB for seeding...');

        await Product.deleteMany();
        console.log('Cleared existing products.');

        await Product.insertMany(products);
        console.log('12 products seeded successfully!');

        // Create an admin user if none exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Admin user created: admin@example.com / admin123');
        }

        process.exit();
    } catch (error) {
        console.error(`Error seeding data: ${error.message}`);
        process.exit(1);
    }
};

seedData();
