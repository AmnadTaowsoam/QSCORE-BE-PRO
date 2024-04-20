// routes/qscore/index.js
const express = require('express');
const router = express.Router();

const qscoresRoutes = require('./qscoresRoutes');
const qscoresResultRoutes = require('./qscoresResultRoutes');

router.use('/qscores', qscoresRoutes);
router.use('/qscores-result', qscoresResultRoutes);

module.exports = router;
