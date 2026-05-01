const express = require('express');
const router = express.Router();
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeatured,
  getCities
} = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public routes
router.get('/', getProperties);
router.get('/featured/list', getFeatured);
router.get('/cities/list', getCities);
router.get('/:id', getProperty);

// Protected admin routes
router.post('/', protect, authorize('admin'), upload.array('images', 10), createProperty);
router.put('/:id', protect, authorize('admin'), upload.array('images', 10), updateProperty);
router.delete('/:id', protect, authorize('admin'), deleteProperty);

module.exports = router;

