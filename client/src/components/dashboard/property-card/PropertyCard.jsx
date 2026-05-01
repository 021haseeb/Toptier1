import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  DollarSign,
  Eye,
  Edit2,
  Trash2,
  Home,
  Building,
  Warehouse,
  Trees,
  Building2
} from 'lucide-react';

const PropertyCard = ({ property, onEdit, onDelete, index = 0 }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyIcon = (type) => {
    const icons = {
      house: Home,
      apartment: Building,
      condo: Building2,
      villa: Home,
      commercial: Warehouse,
      land: Trees,
    };
    return icons[type] || Home;
  };

  const getStatusColor = (status) => {
    const colors = {
      available: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      pending: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
      sold: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30' },
      rented: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
    };
    return colors[status] || colors.available;
  };

  const PropertyIcon = getPropertyIcon(property.type);
  const statusStyle = getStatusColor(property.status);
  const fallbackImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass-card overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={property.images?.[0] || fallbackImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
              {property.status?.charAt(0).toUpperCase() + property.status?.slice(1)}
            </span>
          </div>

          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-secondary text-white">
                Featured
              </span>
            </div>
          )}

          {/* Type Icon */}
          <div className="absolute bottom-3 left-3">
            <div className="p-2 rounded-lg bg-dark-900/60 backdrop-blur-sm">
              <PropertyIcon className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Price */}
          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1.5 rounded-lg bg-dark-900/80 backdrop-blur-sm text-white font-bold">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Title & Location */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-white truncate group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-1.5 text-white/50 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{property.location?.city}, {property.location?.state}</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms || 0}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms || 0}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Square className="w-4 h-4" />
              <span>{property.sqft?.toLocaleString() || 0}</span>
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            <Link
              to={`/properties/${property._id}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-primary/20 text-white/70 hover:text-white transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">View</span>
            </Link>
            <button
              onClick={() => onEdit(property)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-secondary/20 text-white/70 hover:text-white transition-all duration-300"
            >
              <Edit2 className="w-4 h-4" />
              <span className="text-sm font-medium">Edit</span>
            </button>
            <button
              onClick={() => onDelete(property._id)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-white/70 hover:text-rose-400 transition-all duration-300"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
