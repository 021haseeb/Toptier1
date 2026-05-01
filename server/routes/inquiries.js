const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry
} = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/auth');

// Public
router.post('/', [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('message', 'Message is required').notEmpty()
], createInquiry);

// Admin only
router.get('/', protect, authorize('admin'), getInquiries);
router.get('/:id', protect, authorize('admin'), getInquiry);
router.put('/:id', protect, authorize('admin'), updateInquiry);
router.delete('/:id', protect, authorize('admin'), deleteInquiry);

module.exports = router;

