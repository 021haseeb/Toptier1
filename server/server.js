const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
 dotenv.config();

// Connect to database
require('./config/db')();

// Route imports
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const inquiryRoutes = require('./routes/inquiries');
const userRoutes = require('./routes/users');

// Error handler
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'TopTier API is running' });
});

// Serve uploads in development
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error Handling Middleware
app.use(errorHandler);

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

