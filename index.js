
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Configuration
const BASE_URL = 'https://api.joshlei.com/v2/growagarden/stock';
const JSTUDIO_KEY = 'js_3e0b69e59d91adb7af70988016dc52279d1a6a10955baec4de7529a38bda3834';

// Middleware
app.use(express.json());

// Stock API endpoint
app.get('/api/stock', async (req, res) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'jstudio-key': JSTUDIO_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ 
            error: 'Failed to fetch stock data',
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Stock API is running' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
