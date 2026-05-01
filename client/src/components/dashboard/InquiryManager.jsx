import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const InquiryManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchInquiries(); }, []);

  const fetchInquiries = async () => {
    try { 
      const res = await api.get('/inquiries'); 
      setInquiries(res.data.data); 
    } catch (e) { 
      toast.error('Failed'); 
    } finally { 
      setLoading(false); 
    }
  };

  const updateStatus = async (id, status) => {
    try { 
      await api.put(`/inquiries/${id}`, { status }); 
      toast.success('Updated'); 
      fetchInquiries(); 
    } catch (e) { 
      toast.error('Failed'); 
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { 
      await api.delete(`/inquiries/${id}`); 
      toast.success('Deleted'); 
      fetchInquiries(); 
    } catch (e) { 
      toast.error('Failed'); 
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Inquiries</h1>
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 skeleton rounded-lg" />
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center text-white/60">No inquiries</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 text-sm p-4">Name</th>
                  <th className="text-left text-white/60 text-sm p-4">Email</th>
                  <th className="text-left text-white/60 text-sm p-4">Status</th>
                  <th className="text-right text-white/60 text-sm p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <p className="text-white text-sm font-medium">{inq.name}</p>
                    </td>
                    <td className="p-4 text-white/70 text-sm">{inq.email}</td>
                    <td className="p-4">
                      <select 
                        value={inq.status} 
                        onChange={(e) => updateStatus(inq._id, e.target.value)} 
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleDelete(inq._id)} 
                        className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryManager;

