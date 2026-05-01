import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try { 
      const res = await api.get('/users'); 
      setUsers(res.data.data); 
    } catch (e) { 
      toast.error('Failed'); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { 
      await api.delete(`/users/${id}`); 
      toast.success('Deleted'); 
      fetchUsers(); 
    } catch (e) { 
      toast.error('Failed'); 
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Users</h1>
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 skeleton rounded-lg" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-white/60">No users</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 text-sm p-4">User</th>
                  <th className="text-left text-white/60 text-sm p-4">Email</th>
                  <th className="text-left text-white/60 text-sm p-4">Role</th>
                  <th className="text-right text-white/60 text-sm p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                          {u.name.charAt(0)}
                        </div>
                        <span className="text-white text-sm font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white/70 text-sm">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${u.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/80'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleDelete(u._id)} 
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

export default UserManager;

