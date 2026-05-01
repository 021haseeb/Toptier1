import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

const PageWrapper = ({ children }) => (
  <div className="min-h-screen">
    {children}
  </div>
);

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <PropertyProvider>
        <ScrollToTop />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/properties" element={<PageWrapper><Properties /></PageWrapper>} />
            <Route path="/properties/:id" element={<PageWrapper><PropertyDetails /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route 
              path="/dashboard/*" 
              element={
                <PrivateRoute>
                  <PageWrapper><Dashboard /></PageWrapper>
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;

