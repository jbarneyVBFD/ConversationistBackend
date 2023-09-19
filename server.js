// In validateReceipt.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // Receipt validation logic
});

module.exports = router;

// In server.js
const express = require('express');
const validateReceiptRoute = require('./validateReceipt');

const app = express();

app.use('/validate-receipt', validateReceiptRoute);
// ... other routes