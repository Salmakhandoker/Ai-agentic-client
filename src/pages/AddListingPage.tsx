import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Image, Compass, CircleDollarSign, Calendar, Sliders, Loader2 } from 'lucide-react';

export const AddListingPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Form States
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Adventure');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('5');
  const [difficulty, setDifficulty] = useState('Moderate');
  const [groupSize, setGroupSize] = useState('10');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Mutation to add listing
  const addMutation = useMutation<any, Error, any>({
    mutationFn: async (payload) => {
      const res = await axios.post('/listings', payload);
      return res.data;
    },
    onSuccess: () => {
      navigate('/explore');
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.message || 'Error occurred while creating listing.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title || !shortDescription || !fullDescription || !price || !date || !location || !duration || !groupSize) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    // Set fallback image URL if blank
    const fallbackImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80';

    addMutation.mutate({
      title,
      shortDescription,
      fullDescription,
      price: Number(price),
      date: new Date(date),
      category,
      location,
      imageUrl: fallbackImage,
      duration: Number(duration),
      difficulty,
      groupSize: Number(groupSize)
    });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="p-8 rounded-2xl glass-panel border border-slate-800 space-y-6">
        {/* Title */}
        <div className="flex items-center space-x-3 border-b border-slate-850 pb-4">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Adventure Listing</h1>
            <p className="text-slate-400 text-xs">Register a new tour package in the database.</p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-200 rounded-xl text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm text-slate-300">
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Package Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Swiss Alps Expedition"
                className="w-full bg-slateCustom-800 text-slate-100 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slateCustom-800 text-slate-100 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
              >
                <option value="Wellness">Wellness</option>
                <option value="Adventure">Adventure</option>
                <option value="Culture">Culture</option>
                <option value="Nature">Nature</option>
                <option value="Relaxation">Relaxation</option>
              </select>
            </div>
          </div>

          {/* Location & Image Url */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location *</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kyoto, Japan"
                className="w-full bg-slateCustom-800 text-slate-100 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Image URL (Optional)</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-slateCustom-800 text-slate-100 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Short Description (Max 150 chars) *</label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Provide a quick catchy sentence about this experience..."
              className="w-full bg-slateCustom-800 text-slate-100 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
              maxLength={150}
              required
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Details & Overview *</label>
            <textarea
              rows={5}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Provide a detailed day by day or background overview..."
              className="w-full bg-slateCustom-800 text-slate-100 p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500 resize-none"
              required
            />
          </div>

          {/* Price, Date, Group Size */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Price ($ USD) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 1500"
                className="w-full bg-slateCustom-800 text-slate-100 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                min="1"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Start Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slateCustom-800 text-slate-100 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Max Group Size *</label>
              <input
                type="number"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                className="w-full bg-slateCustom-800 text-slate-100 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
                min="1"
                required
              />
            </div>
          </div>

          {/* Duration & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration (Days) *</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slateCustom-800 text-slate-100 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
                min="1"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Physical Intensity *</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slateCustom-800 text-slate-100 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
              >
                <option value="Easy">Easy (Relaxed walking)</option>
                <option value="Moderate">Moderate (Hiking/Kayaking)</option>
                <option value="Challenging">Challenging (Alpine trails)</option>
              </select>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/explore')}
              className="bg-slateCustom-800 hover:bg-slateCustom-900 border border-slate-700 text-slate-200 px-6 py-3 rounded-xl font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addMutation.isPending}
              className="bg-primary hover:bg-primary-dark text-slateCustom-900 font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/10 flex items-center gap-2 cursor-pointer"
            >
              {addMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Add Package</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
