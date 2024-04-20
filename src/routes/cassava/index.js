// routes/cassava/index.js

const express = require('express');
const router = express.Router();
const predictResultRoutes = require('./predictResultRoutes');

router.use('/predict-result', predictResultRoutes);

module.exports = router;
