const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const schedule = require('node-schedule');
const authenticateToken = require('./middleware/authenticateToken');
const deleteOldRecords = require('./tasks/deleteOldRecords');
const authRoutes = require('./routes/authRoutes');
const qscoreRoutes = require('./routes/qscoreRoutes');
require('dotenv').config({ path: '../.env' });

const app = express();

// Middleware imports and setup
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  optionsSuccessStatus: 200
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
app.use(bodyParser.json());

// Route imports and setup
app.use('/api/auth', authRoutes);
app.use('/qscore', authenticateToken, qscoreRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong', error: err.message });

  // If the headers have already been sent, it means the error occurred after
  // the response was sent, so we log it and exit the process
  if (res.headersSent) {
    console.error('Headers have already been sent, exiting process...');
    process.exit(1);
  }
});

// Scheduled task setup
schedule.scheduleJob('0 0 * * *', async () => {
  try {
    await deleteOldRecords();
    console.log('Scheduled task: Old records deletion completed.');
  } catch (error) {
    console.error('Error executing scheduled deletion task:', error.message);
  }
});

// Start server
const port = process.env.PORT || 8002;
app.listen(port, () => {
  console.log(`Qscore service is running on port ${port}`);
});