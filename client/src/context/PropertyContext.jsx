import { createContext, useContext, useState } from 'react';

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist') || '[]');
    } catch (error) {
      console.error('Error reading wishlist from localStorage:', error);
      return [];
    }
  });

  const getWishlist = () => wishlist;

  const addToWishlist = (propertyId) => {
    const currentWishlist = getWishlist();
    if (!currentWishlist.includes(propertyId)) {
      const newWishlist = [...currentWishlist, propertyId];
      setWishlist(newWishlist);
      try {
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    }
  };

  const removeFromWishlist = (propertyId) => {
    const newWishlist = getWishlist().filter(id => id !== propertyId);
    setWishlist(newWishlist);
    try {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  };

  const isInWishlist = (propertyId) => {
    return getWishlist().includes(propertyId);
  };

  return (
    <PropertyContext.Provider value={{ getWishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) throw new Error('useProperty must be used within PropertyProvider');
  return context;
};

