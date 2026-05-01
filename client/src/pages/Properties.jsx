import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, SlidersHorizontal, X } from 'lucide-react';
import api from '../utils/api';
import { useProperty } from '../context/PropertyContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: 'all',
    type: 'all',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });
  const [cities, setCities] = useState([]);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useProperty();

  useEffect(() => {
    fetchProperties();
    fetchCities();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (filters.city !== 'all') params.append('city', filters.city);
      if (filters.type !== 'all') params.append('type', filters.type);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      params.append('sort', filters.sort);

      const res = await api.get(`/properties?${params.toString()}`);
      setProperties(res.data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await api.get('/properties/cities/list');
      setCities(res.data.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchProperties();
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({ city: 'all', type: 'all', minPrice: '', maxPrice: '', sort: 'newest' });
    setSearchQuery('');
    fetchProperties();
  };

  const toggleWishlist = (e, propertyId) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(propertyId)) {
      removeFromWishlist(propertyId);
    } else {
      addToWishlist(propertyId);
    }
  };

  const propertyTypes = ['house', 'apartment', 'condo', 'villa', 'commercial', 'land'];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Properties</h1>
            <p className="text-white/60 text-lg">Discover our exclusive collection of luxury properties</p>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search by location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </form>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-6 py-3 glass rounded-xl text-white hover:bg-white/10 transition-all"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Filter Panel */}
            <motion.div
              initial={false}
              animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card p-6 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">City</label>
                  <select
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50"
                  >
                    <option value="all">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50"
                  >
                    <option value="all">All Types</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Min Price</label>
                  <input
                    type="number"
                    placeholder="$0"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Max Price</label>
                  <input
                    type="number"
                    placeholder="$∞"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Sort By</label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-5 flex gap-3">
                  <button onClick={applyFilters} className="btn-primary flex-1">Apply Filters</button>
                  <button onClick={clearFilters} className="btn-outline flex items-center gap-2">
                    <X className="w-4 h-4" /> Clear
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6 text-white/60 text-sm">
            Showing {properties.length} properties
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card overflow-hidden">
                  <div className="h-56 skeleton" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 skeleton rounded w-3/4" />
                    <div className="h-3 skeleton rounded w-1/2" />
                    <div className="h-6 skeleton rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No properties found matching your criteria.</p>
              <button onClick={clearFilters} className="btn-primary mt-4">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/properties/${property._id}`} className="group block">
                    <div className="glass-card-hover overflow-hidden h-full">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1 rounded-full bg-primary/80 text-white text-xs font-medium backdrop-blur-sm">
                            {property.type}
                          </span>
                          {property.featured && (
                            <span className="px-3 py-1 rounded-full bg-amber-500/80 text-white text-xs font-medium backdrop-blur-sm">
                              Featured
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => toggleWishlist(e, property._id)}
                          className="absolute top-4 right-4 p-2 rounded-full bg-dark-900/50 backdrop-blur-sm text-white hover:bg-red-500/80 transition-all"
                        >
                          <Heart className={`w-5 h-5 ${isInWishlist(property._id) ? 'fill-red-400 text-red-400' : ''}`} />
                        </button>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-bold text-xl">${property.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-1 text-white/50 text-sm mb-4">
                          <MapPin className="w-4 h-4" />
                          {property.location.city}, {property.location.state}
                        </div>
                        <div className="flex items-center gap-4 text-white/60 text-sm">
                          <span className="flex items-center gap-1">
                            <Bed className="w-4 h-4" /> {property.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="w-4 h-4" /> {property.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Square className="w-4 h-4" /> {property.sqft.toLocaleString()} sqft
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;

