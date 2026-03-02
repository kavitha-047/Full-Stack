const { z } = require('zod');

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
});

const productSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    price: z.number().positive('Price must be positive'),
    category: z.enum(['Fruits', 'Vegetables', 'Fast Food', 'Dairy', 'Bakery', 'Beverages']),
    image: z.string().url('Invalid image URL'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    stock: z.number().int().nonnegative('Stock cannot be negative')
});

const orderSchema = z.object({
    orderItems: z.array(z.object({
        title: z.string(),
        quantity: z.number().int().positive(),
        image: z.string(),
        price: z.number(),
        product: z.string()
    })).min(1, 'Cart cannot be empty'),
    shippingAddress: z.object({
        house: z.string().min(1, 'House info is required'),
        street: z.string().min(1, 'Street info is required'),
        city: z.string().min(1, 'City is required'),
        pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode (6 digits expected)')
    }),
    paymentMethod: z.string().default('COD'),
    totalPrice: z.number()
});

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({
            message: 'Validation failed',
            errors: error.errors.map(err => ({ field: err.path[0], message: err.message }))
        });
    }
};

module.exports = {
    registerSchema,
    loginSchema,
    productSchema,
    orderSchema,
    validate
};
