// Express routes for handyman services
const express = require('express');
const router = express.Router();

// GET /api/services - Get all services
router.get('/', (req, res) => {
    // TODO: Implement service listing
});

// POST /api/services/request - Submit service request
router.post('/request', (req, res) => {
    // TODO: Implement service request submission
});

module.exports = router;
