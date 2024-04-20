// routes/cornMoist/index.js

const express = require('express');
const router = express.Router();
const cornMoistRoutes = require('./cornMoistRoutes')

router.use('/corn_moist-result', cornMoistRoutes);

module.exports = router;