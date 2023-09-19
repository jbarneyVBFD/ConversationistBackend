require('dotenv').config();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

// Allow parsing of POST request bodies
app.use(bodyParser.json());

// Define the route for receipt validation
app.post('/validate-receipt', (req, res) => {
    const receiptData = req.body.receipt_data;

    if (!receiptData) {
        return res.status(400).send({ error: 'Receipt data is missing.' });
    }

    const validationURL = process.env.NODE_ENV === 'production' 
        ? 'https://buy.itunes.apple.com/verifyReceipt' 
        : 'https://sandbox.itunes.apple.com/verifyReceipt';

    // Send the receipt data to Apple for validation
    request.post({
        url: validationURL,
        json: {
            'receipt-data': receiptData,
            'password': process.env.SHARED_SECRET,
        }
    }, (error, response, body) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to validate receipt with Apple.' });
        }

        // Respond with the validation result from Apple
        // Note: the actual Apple response contains a lot more information. 
        // You would typically parse that information to determine whether the receipt 
        // includes a valid subscription. For simplicity's sake, I'll assume if 
        // the Apple response status is 0 (meaning the receipt is valid), then 
        // the subscription is considered valid (this may not be accurate for your needs).
        if (body && body.status === 0) {
            res.send({ valid: true, isSubscribed: true });
        } else {
            res.send({ valid: false, isSubscribed: false });
        }
    });
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});