require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const validateReceiptRoute = require('./validateReceipt');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/validate-receipt', validateReceiptRoute);
// ... other routes

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
