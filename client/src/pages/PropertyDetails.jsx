import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, Heart, Share2, ChevronLeft, ChevronRight, Mail, Phone, User, Check } from 'lucide-react';
import api from '../utils/api';
import { useProperty } from '../context/PropertyContext';
import toast from 'react-hot-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useProperty();

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/properties/${id}`);
      setProperty(res.data.data);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast.error('Property not found');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/inquiries', { ...inquiryForm, propertyId: id });
      toast.success('Inquiry submitted successfully!');
      setInquiryForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleWishlist = () => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(id);
      toast.success('Added to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="h-96 skeleton rounded-2xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 skeleton rounded w-3/4" />
              <div className="h-4 skeleton rounded w-1/2" />
              <div className="h-32 skeleton rounded" />
            </div>
            <div className="h-64 skeleton rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Property Not Found</h2>
          <Link to="/properties" className="btn-primary">Browse Properties</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
{/* Image Gallery */}
      <div className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <img
            src={property.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
        
        {/* Navigation */}
        {property.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-900/50 backdrop-blur-sm text-white hover:bg-dark-900/80 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-900/50 backdrop-blur-sm text-white hover:bg-dark-900/80 transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Thumbnails */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>

        {/* Back button */}
        <Link to="/properties" className="absolute top-4 left-4 p-3 rounded-full bg-dark-900/50 backdrop-blur-sm text-white hover:bg-dark-900/80 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={toggleWishlist} className="p-3 rounded-full bg-dark-900/50 backdrop-blur-sm text-white hover:bg-dark-900/80 transition-all">
            <Heart className={`w-5 h-5 ${isInWishlist(id) ? 'fill-red-400 text-red-400' : ''}`} />
          </button>
          <button className="p-3 rounded-full bg-dark-900/50 backdrop-blur-sm text-white hover:bg-dark-900/80 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="section-padding -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 lg:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl lg:text-4xl font-bold text-white">{property.title}</h1>
                    <div className="flex items-center gap-2 text-white/60 mt-2">
                      <MapPin className="w-4 h-4" />
                      {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold gradient-text">${property.price.toLocaleString()}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                      property.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                      property.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <Bed className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-white font-semibold">{property.bedrooms}</p>
                    <p className="text-white/50 text-sm">Bedrooms</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <Bath className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-white font-semibold">{property.bathrooms}</p>
                    <p className="text-white/50 text-sm">Bathrooms</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <Square className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-white font-semibold">{property.sqft.toLocaleString()}</p>
                    <p className="text-white/50 text-sm">Sq Ft</p>
                  </div>
<div className="text-center p-4 rounded-xl bg-white/5">
                    <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-white font-semibold">{property.yearBuilt || 'N/A'}</p>
                    <p className="text-white/50 text-sm">Year Built</p>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 lg:p-8"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
                <p className="text-white/70 leading-relaxed">{property.description}</p>
              </motion.div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card p-6 lg:p-8"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-white/70">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Agent */}
              {property.agent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6 lg:p-8"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Listing Agent</h2>
                  <div className="flex items-center gap-4">
                    <img
                      src={property.agent.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'}
                      alt={property.agent.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{property.agent.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-white/60 text-sm">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" /> {property.agent.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" /> {property.agent.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Inquiry Form */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 sticky top-24"
              >
                <h3 className="text-xl font-semibold text-white mb-6">Interested? Contact Us</h3>
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      className="input-field"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="input-field resize-none"
                      placeholder="I'm interested in this property..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-4 h-4" /> Send Inquiry
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

