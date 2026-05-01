const Inquiry = require('../models/Inquiry');
const { sendEmail } = require('../utils/emailService');

// @desc    Create inquiry
// @route   POST /api/inquiries
// @access  Public
exports.createInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, propertyId } = req.body;

    const inquiryData = {
      name,
      email,
      phone,
      subject,
      message
    };

    if (propertyId) {
      inquiryData.property = propertyId;
    }

    const inquiry = await Inquiry.create(inquiryData);

    // Send notification email
    try {
      await sendEmail({
        to: process.env.SMTP_USER || 'admin@toptier.com',
        subject: `New Inquiry: ${subject || 'General Inquiry'}`,
        html: `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
exports.getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('property', 'title')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single inquiry
// @route   GET /api/inquiries/:id
// @access  Private/Admin
exports.getInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).populate('property', 'title');
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
exports.updateInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
exports.deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    await inquiry.deleteOne();
    res.status(200).json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    next(error);
  }
};

