const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/product.model');
const User = require('../models/user.model');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const products = [
    {
        title: 'Alphonso Mangoes',
        price: 499,
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400',
        description: 'Sweet and juicy seasonal Alphonso mangoes from Ratnagiri.',
        stock: 40
    },
    {
        title: 'Fresh Paneer (Dairy)',
        price: 120,
        category: 'Dairy',
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=400',
        description: 'Soft and fresh malai paneer for your curries.',
        stock: 50
    },
    {
        title: 'Masala Samosas (4pcs)',
        price: 60,
        category: 'Snacks',
        image: 'https://images.unsplash.com/photo-1601050638917-3f94ddb4065d?auto=format&fit=crop&q=80&w=400',
        description: 'Crispy and spicy traditional Indian samosas.',
        stock: 30
    },
    {
        title: 'Basmati Rice (5kg)',
        price: 850,
        category: 'Staples',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
        description: 'Long grain aromatic basmati rice.',
        stock: 100
    },
    {
        title: 'Fresh Bhindi (Okra)',
        price: 40,
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1628151016068-07e0344d2d46?auto=format&fit=crop&q=80&w=400',
        description: 'Tender and fresh green ladies finger (Bhindi).',
        stock: 60
    },
    {
        title: 'Maggi Noodles (Pack of 8)',
        price: 110,
        category: 'Snacks',
        image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=400',
        description: 'India\'s favorite 2-minute snack.',
        stock: 80
    },
    {
        title: 'Amul Butter (500g)',
        price: 255,
        category: 'Dairy',
        image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400',
        description: 'The taste of India - salted yellow butter.',
        stock: 100
    },
    {
        title: 'Shahi Biryani Masala',
        price: 45,
        category: 'Spices',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400',
        description: 'Authentic spice mix for perfect biryani.',
        stock: 200
    },
    {
        title: 'Pomegranates (Anaar)',
        price: 180,
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&q=80&w=400',
        description: 'Rich in antioxidants, sweet red pearls.',
        stock: 25
    },
    {
        title: 'Gobi (Cauliflower)',
        price: 35,
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ec3?auto=format&fit=crop&q=80&w=400',
        description: 'Fresh white cauliflower from local mandi.',
        stock: 40
    },
    {
        title: 'Masala Chai Mix',
        price: 150,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1544787210-22bb83063857?auto=format&fit=crop&q=80&w=400',
        description: 'Traditional spiced tea premix.',
        stock: 150
    },
    {
        title: 'Green Chillies (Hari Mirch)',
        price: 15,
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&q=80&w=400',
        description: 'Spicy green chillies for daily cooking.',
        stock: 500
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
