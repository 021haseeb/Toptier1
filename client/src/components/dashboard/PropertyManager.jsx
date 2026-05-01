import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, X, Upload, MapPin, Bed, Bath, Square, DollarSign } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const PropertyManager = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const emptyForm = {
    title: '',
    description: '',
    price: '',
    location: { address: '', city: '', state: '', zipCode: '' },
    type: 'house',
    status: 'available',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    images: [],
    features: [],
    featured: false,
    agent: { name: '', email: '', phone: '' }
  };

  const [formData, setFormData] = useState(emptyForm);
  const [featureInput, setFeatureInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get('/properties');
      setProperties(res.data.data);
    } catch (error) {
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        sqft: Number(formData.sqft),
        yearBuilt: Number(formData.yearBuilt) || undefined
      };

      if (editingProperty) {
        await api.put(`/properties/${editingProperty._id}`, payload);
        toast.success('Property updated successfully');
      } else {
        await api.post('/properties', payload);
        toast.success('Property created successfully');
      }

      setModalOpen(false);
      setEditingProperty(null);
      setFormData(emptyForm);
      fetchProperties();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/properties/${id}`);
      toast.success('Property deleted');
      setDeleteConfirm(null);
      fetchProperties();
    } catch (error) {
      toast.error('Failed to delete property');
    }
  };

  const openEditModal = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      type: property.type,
      status: property.status,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      yearBuilt: property.yearBuilt || '',
      images: property.images,
      features: property.features,
      featured: property.featured,
      agent: property.agent
    });
    setModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingProperty(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim() && !formData.images.includes(imageUrlInput.trim())) {
      setFormData({ ...formData, images: [...formData.images, imageUrlInput.trim()] });
      setImageUrlInput('');
    }
  };

  const removeImage = (index) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Property Management</h1>
          <p className="text-white/60 mt-1">Manage all property listings</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Property
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-6 skeleton h-24" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map((property) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={property.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white truncate">{property.title}</h3>
                      <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        {property.location.city}, {property.location.state}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      property.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                      property.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                      property.status === 'sold' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" /> {property.bedrooms} beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4" /> {property.bathrooms} baths
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="w-4 h-4" /> {property.sqft?.toLocaleString()} sqft
                    </span>
                    <span className="flex items-center gap-1 text-primary font-semibold">
                      <DollarSign className="w-4 h-4" /> {formatPrice(property.price)}
                    </span>
                    {property.featured && (
                      <span className="px-2 py-0.5 rounded bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-xs">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex lg:flex-col items-center gap-2 shrink-0">
                  <Link
                    to={`/properties/${property._id}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => openEditModal(property)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-white/60 hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(property._id)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-800 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-dark-800/95 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-white">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h2>
                <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-white/60 text-sm mb-2 block">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input-field"
                      placeholder="Property title"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-white/60 text-sm mb-2 block">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input-field resize-none"
                      placeholder="Property description"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Price *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="input-field"
                      placeholder="4500000"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="input-field"
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="villa">Villa</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="input-field"
                    >
                      <option value="available">Available</option>
                      <option value="pending">Pending</option>
                      <option value="sold">Sold</option>
                      <option value="rented">Rented</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                    <label htmlFor="featured" className="text-white text-sm">Featured Property</label>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Bedrooms</label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="input-field"
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Bathrooms</label>
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="input-field"
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Square Feet</label>
                    <input
                      type="number"
                      value={formData.sqft}
                      onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                      className="input-field"
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Year Built</label>
                    <input
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                      className="input-field"
                      placeholder="2023"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-white/60 text-sm mb-2 block">Address</label>
                    <input
                      type="text"
                      value={formData.location.address}
                      onChange={(e) => setFormData({ ...formData, location: { ...formData.location, address: e.target.value } })}
                      className="input-field"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">City</label>
                    <input
                      type="text"
                      value={formData.location.city}
                      onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                      className="input-field"
                      placeholder="Miami"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">State</label>
                    <input
                      type="text"
                      value={formData.location.state}
                      onChange={(e) => setFormData({ ...formData, location: { ...formData.location, state: e.target.value } })}
                      className="input-field"
                      placeholder="FL"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">ZIP Code</label>
                    <input
                      type="text"
                      value={formData.location.zipCode}
                      onChange={(e) => setFormData({ ...formData, location: { ...formData.location, zipCode: e.target.value } })}
                      className="input-field"
                      placeholder="33139"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-white/60 text-sm mb-2 block">Agent Name</label>
                    <input
                      type="text"
                      value={formData.agent.name}
                      onChange={(e) => setFormData({ ...formData, agent: { ...formData.agent, name: e.target.value } })}
                      className="input-field"
                      placeholder="Agent name"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Agent Email</label>
                    <input
                      type="email"
                      value={formData.agent.email}
                      onChange={(e) => setFormData({ ...formData, agent: { ...formData.agent, email: e.target.value } })}
                      className="input-field"
                      placeholder="agent@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Agent Phone</label>
                    <input
                      type="tel"
                      value={formData.agent.phone}
                      onChange={(e) => setFormData({ ...formData, agent: { ...formData.agent, phone: e.target.value } })}
                      className="input-field"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Features</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      className="input-field flex-1"
                      placeholder="Add a feature (e.g. Pool, Garage)"
                    />
                    <button type="button" onClick={addFeature} className="btn-primary px-4">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {feature}
                        <button type="button" onClick={() => removeFeature(index)} className="hover:text-white">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Image URLs</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                      className="input-field flex-1"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button type="button" onClick={addImageUrl} className="btn-primary px-4">
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group rounded-xl overflow-hidden aspect-video">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalOpen(false)} className="btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingProperty ? 'Update Property' : 'Create Property'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-dark-800 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center"
            >
              <Trash2 className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Delete Property?</h3>
              <p className="text-white/60 mb-6">This action cannot be undone. The property will be permanently removed.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => setDeleteConfirm(null)} className="btn-outline">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConfirm)} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyManager;
