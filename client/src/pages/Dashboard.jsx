import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Overview from '../components/dashboard/Overview';
import PropertyManager from '../components/dashboard/PropertyManager';
import InquiryManager from '../components/dashboard/InquiryManager';
import UserManager from '../components/dashboard/UserManager';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 min-w-0">
        <div className="lg:hidden flex items-center gap-4 p-4 border-b border-white/5">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-2 rounded-lg hover:bg-white/10 text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold gradient-text">Dashboard</span>
        </div>
        <div className="p-6 lg:p-10">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/properties" element={<PropertyManager />} />
            <Route path="/inquiries" element={<InquiryManager />} />
            <Route path="/users" element={<UserManager />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

