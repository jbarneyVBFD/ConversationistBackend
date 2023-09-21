const express = require('express');
const request = require('request');
const router = express.Router();

// Define the route for transaction validation
router.post('/', (req, res) => {
    const jwsRepresentation = req.body.jwsRepresentation;

    if (!jwsRepresentation) {
        return res.status(400).send({ error: 'Transaction JWS representation is missing.' });
    }

    // Determine the validation URL based on the environment
    const validationURL = process.env.NODE_ENV === 'production' 
        ? 'https://buy.itunes.apple.com/verifyTransaction' 
        : 'https://sandbox.itunes.apple.com/verifyTransaction';  // Update this if Apple provides different endpoints for transactions

    // Send the JWS representation to Apple for validation
    request.post({
        url: validationURL,
        json: {
            'jws-representation': jwsRepresentation,
            'password': process.env.SHARED_SECRET, // Assumed this is still required. If not, remove.
        }
    }, (error, response, body) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to validate transaction with Apple.' });
        }

        // Handle the validation result from Apple
        if (body && body.status === 0) {
            // You can add more checks here to validate the actual transaction details
            // such as checking entitlements or transaction dates.
            res.send({ valid: true, isEntitled: true });
        } else {
            res.send({ valid: false, isEntitled: false });
        }
    });
});

module.exports = router;
