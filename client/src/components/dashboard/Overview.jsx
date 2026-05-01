import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Users, LayoutDashboard } from 'lucide-react';
import api from '../../utils/api';

const Overview = () => {
  const [stats, setStats] = useState({ properties: 0, inquiries: 0, users: 0, totalValue: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const [pRes, iRes, uRes] = await Promise.all([
        api.get('/properties'), api.get('/inquiries'), api.get('/users')
      ]);
      const properties = pRes.data.data;
      const inquiries = iRes.data.data;
      const users = uRes.data.data;
      const totalValue = properties.reduce((s, p) => s + (p.price || 0), 0);
      setStats({ properties: properties.length, inquiries: inquiries.length, users: users.length, totalValue });
      setRecent(inquiries.slice(0, 5));
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const statCards = [
    { label: 'Properties', value: stats.properties, icon: Building2 },
    { label: 'Inquiries', value: stats.inquiries, icon: Mail },
    { label: 'Users', value: stats.users, icon: Users },
    { label: 'Portfolio', value: `$${(stats.totalValue / 1000000).toFixed(1)}M`, icon: LayoutDashboard },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((s, i) => (
          <motion.div 
            key={s.label} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }} 
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">{s.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <s.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Inquiries</h2>
        {recent.length === 0 ? (
          <p className="text-white/60 text-center py-8">No inquiries yet</p>
        ) : (
          <div className="space-y-4">
            {recent.map((inq) => (
              <div key={inq._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div>
                  <p className="text-white font-medium">{inq.name}</p>
                  <p className="text-white/60 text-sm">{inq.email}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">{inq.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
