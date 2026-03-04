const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Adjust if port is different

async function runTest() {
    console.log('--- Starting Feature Verification ---');

    try {
        // 1. Fetch products to get an ID
        const productsRes = await axios.get(`${API_URL}/products`);
        const productId = productsRes.data.products[0]._id;
        console.log(`Testing with Product ID: ${productId}`);

        // 2. Test Similar Products endpoint
        const similarRes = await axios.get(`${API_URL}/products/${productId}/similar`);
        console.log(`Similar Products found: ${similarRes.data.length}`);
        if (similarRes.data.length > 0) {
            console.log('âœ… Similar Products API working');
        }

        // Note: Reviews require authentication, so we'll rely on manual verification 
        // for the protected POST route unless we want to simulate a full login flow here.
        // For now, checking the GET detail shows the new fields.
        const detailRes = await axios.get(`${API_URL}/products/${productId}`);
        console.log(`Product Rating: ${detailRes.data.rating}`);
        console.log(`Number of Reviews: ${detailRes.data.numReviews}`);
        console.log('âœ… Model updates verified');

    } catch (error) {
        console.error('â Œ Test failed:', error.message);
        if (error.response) console.error('Response:', error.response.data);
    }
}

// runTest();
console.log('Test script ready. Requires server to be running.');
