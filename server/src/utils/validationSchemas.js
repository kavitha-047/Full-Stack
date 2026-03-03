const { z } = require('zod');

const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
});

const productSchema = z.object({
    body: z.object({
        title: z.string().min(3, 'Title is too short'),
        price: z.number().positive('Price must be greater than 0'),
        description: z.string().min(10, 'Description is too short'),
        category: z.string(),
        image: z.string().url('Invalid image URL'),
        stock: z.number().int().nonnegative(),
    }),
});

const orderSchema = z.object({
    body: z.object({
        orderItems: z.array(z.object({
            title: z.string(),
            quantity: z.number().int().positive(),
            image: z.string(),
            price: z.number(),
            product: z.string(),
        })).min(1, 'Order must have at least one item'),
        shippingAddress: z.object({
            address: z.string().min(1, 'Address is required'),
            city: z.string().min(1, 'City is required'),
            postalCode: z.string().min(1, 'Postal code is required'),
            country: z.string().min(1, 'Country is required'),
        }),
        paymentMethod: z.string().min(1, 'Payment method is required'),
        itemsPrice: z.number(),
        taxPrice: z.number(),
        shippingPrice: z.number(),
        totalPrice: z.number(),
    }),
});

module.exports = {
    registerSchema,
    loginSchema,
    productSchema,
    orderSchema,
};
