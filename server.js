const express = require('express');
const validateReceiptRoute = require('./validateReceipt');

const app = express();

app.use('/validate-receipt', validateReceiptRoute);
// ... other routes

// Start the server
const PORT = 3000;
router.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});