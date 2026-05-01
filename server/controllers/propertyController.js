const Property = require('../models/Property');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res, next) => {
  try {
    const { search, city, type, minPrice, maxPrice, status, featured, sort } = req.query;
    
    let query = {};

// Search by text (using regex for partial match flexibility)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by city
    if (city && city !== 'all') {
      query['location.city'] = new RegExp(city, 'i');
    }

    // Filter by type
    if (type && type !== 'all') {
      query.type = type;
    }

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Build sort
    let sortBy = {};
    if (sort === 'price-asc') sortBy.price = 1;
    else if (sort === 'price-desc') sortBy.price = -1;
    else if (sort === 'newest') sortBy.createdAt = -1;
    else sortBy.createdAt = -1;

    const properties = await Property.find(query).sort(sortBy);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
};

// @desc    Create property
// @route   POST /api/properties
// @access  Private/Admin
exports.createProperty = async (req, res, next) => {
  try {
    const propertyData = req.body;
    
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      propertyData.images = req.files.map(file => file.path);
    }

    const property = await Property.create(propertyData);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Admin
exports.updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const updateData = { ...req.body };
    
    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.path);
    }

    property = await Property.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    await property.deleteOne();
    res.status(200).json({ success: true, message: 'Property deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured properties
// @route   GET /api/properties/featured/list
// @access  Public
exports.getFeatured = async (req, res, next) => {
  try {
    const properties = await Property.find({ featured: true, status: 'available' })
      .limit(6)
      .sort('-createdAt');
    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    next(error);
  }
};

// @desc    Get unique cities (for filter)
// @route   GET /api/properties/cities/list
// @access  Public
exports.getCities = async (req, res, next) => {
  try {
    const cities = await Property.distinct('location.city');
    res.status(200).json({ success: true, data: cities });
  } catch (error) {
    next(error);
  }
};

