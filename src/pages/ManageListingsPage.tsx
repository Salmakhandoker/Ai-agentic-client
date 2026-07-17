import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Trash2, Eye, LayoutDashboard, PlusCircle, BarChart3, LineChart, Loader2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Listing {
  _id: string;
  title: string;
  price: number;
  category: string;
  location: string;
  duration: number;
  ratingAverage: number;
}

export const ManageListingsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Fetch all listings (no filters for management)
  const { data, isLoading } = useQuery({
    queryKey: ['manage-listings'],
    queryFn: async () => {
      const res = await axios.get('/listings', { params: { limit: 100 } });
      return res.data;
    }
  });

  // Delete listing mutation
  const deleteMutation = useMutation<any, Error, string>({
    mutationFn: async (id) => {
      const res = await axios.delete(`/listings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manage-listings'] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Failed to delete listing.');
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing from the database?')) {
      deleteMutation.mutate(id);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const listings: Listing[] = data?.listings || [];

  // Calculate charts data
  const categoryCounts: { [key: string]: number } = {};
  const categoryPrices: { [key: string]: { total: number; count: number } } = {};

  listings.forEach((l) => {
    categoryCounts[l.category] = (categoryCounts[l.category] || 0) + 1;
    if (!categoryPrices[l.category]) {
      categoryPrices[l.category] = { total: 0, count: 0 };
    }
    categoryPrices[l.category].total += l.price;
    categoryPrices[l.category].count += 1;
  });

  const chartCategoryData = Object.keys(categoryCounts).map((cat) => ({
    name: cat,
    count: categoryCounts[cat],
    avgPrice: Math.round(categoryPrices[cat].total / categoryPrices[cat].count)
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2.5">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            <span>Dashboard Manager</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Review active adventure listings, track pricing, and manage data.</p>
        </div>
        <Link
          to="/items/add"
          className="bg-primary hover:bg-primary-dark text-slateCustom-900 font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-1.5 self-start sm:self-auto shadow-md"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          <span>Add Adventure</span>
        </Link>
      </div>

      {/* Analytics Charts Panel */}
      {listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chart 1: Distribution */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <BarChart3 className="w-4.5 h-4.5 text-primary" />
              <span>Tour Packages Distribution by Category</span>
            </h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartCategoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} />
                  <YAxis stroke="#475569" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#161D30', borderColor: '#1F293D', color: '#fff', borderRadius: 8 }} />
                  <Bar dataKey="count" name="Trips Count" fill="#05B284" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Average Prices */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <LineChart className="w-4.5 h-4.5 text-secondary" />
              <span>Average Package Price by Category ($ USD)</span>
            </h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartCategoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} />
                  <YAxis stroke="#475569" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#161D30', borderColor: '#1F293D', color: '#fff', borderRadius: 8 }} />
                  <Bar dataKey="avgPrice" name="Avg Price" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Listings Table Dashboard */}
      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
        {listings.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center space-y-4">
            <p className="text-slate-400 text-sm">No adventures in the database yet.</p>
            <Link to="/items/add" className="bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary px-5 py-2 rounded-xl text-xs font-bold">
              Add First Adventure
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slateCustom-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4 pl-6">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 pr-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 bg-slateCustom-900/20">
                {listings.map((l) => (
                  <tr key={l._id} className="hover:bg-slateCustom-800/35 transition-colors">
                    <td className="p-4 pl-6 font-bold text-white max-w-[200px] truncate">{l.title}</td>
                    <td className="p-4">
                      <span className="bg-slateCustom-800 border border-slate-700/60 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        {l.category}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-400">{l.location}</td>
                    <td className="p-4 text-xs">{l.duration} Days</td>
                    <td className="p-4 font-extrabold text-primary">${l.price}</td>
                    <td className="p-4 text-xs">{l.ratingAverage}/5.0</td>
                    <td className="p-4 pr-6 text-center flex items-center justify-center space-x-3">
                      <Link
                        to={`/explore/${l._id}`}
                        className="p-2 hover:bg-slateCustom-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                        title="View Listing Details"
                      >
                        <Eye className="w-4.5 h-4.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(l._id)}
                        disabled={deleteMutation.isPending}
                        className="p-2 hover:bg-red-950/30 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
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
