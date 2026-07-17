import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Sparkles, CircleDollarSign, Compass, Star, MapPin, Eye, Settings, Loader2 } from 'lucide-react';

interface RecommendedMatch {
  listingId: string;
  reasoning: string;
}

interface RecommendationResponse {
  personalizedIntro: string;
  recommendations: RecommendedMatch[];
}

export const ProfilePage: React.FC = () => {
  const { user, loading, updateProfile } = useAuth();
  const navigate = useNavigate();

  // Settings form states
  const [budget, setBudget] = useState(3000);
  const [climate, setClimate] = useState('Tropical');
  const [pace, setPace] = useState('Moderate');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const interestOptions = ['Adventure', 'Nature', 'Wellness', 'Culture', 'Relaxation', 'Food'];

  // Initialize state from user profile
  useEffect(() => {
    if (user) {
      setBudget(user.profile.budget);
      setClimate(user.profile.climate);
      setPace(user.profile.pace);
      setSelectedInterests(user.profile.interests);
    }
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Query to fetch recommended matching adventures
  const { data: recData, refetch: getRecs, isFetching: recLoading, error: recError } = useQuery<RecommendationResponse>({
    queryKey: ['my-recommendations'],
    queryFn: async () => {
      const res = await axios.post('/ai/recommendations');
      return res.data;
    },
    enabled: false // Triggered manually by clicking the match button
  });

  // Query to resolve recommendation items listings details
  const matchedListingIds = recData?.recommendations.map(r => r.listingId) || [];
  const { data: listingsData, isFetching: listingsLoading } = useQuery({
    queryKey: ['rec-listings-resolved', matchedListingIds],
    queryFn: async () => {
      // Fetch each recommended listing by id
      const fetchListings = matchedListingIds.map(async (id) => {
        try {
          const res = await axios.get(`/listings/${id}`);
          return res.data.listing;
        } catch {
          return null;
        }
      });
      const resolved = await Promise.all(fetchListings);
      return resolved.filter(Boolean);
    },
    enabled: matchedListingIds.length > 0
  });

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setSaveSuccess(false);
    try {
      await updateProfile({
        budget,
        climate,
        pace,
        interests: selectedInterests
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Error updating traveler profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const resolvedRecommendations = listingsData || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Col 1: Profile Settings (5 columns) */}
      <form onSubmit={handleSaveSettings} className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Traveler Profile Settings</h2>
            <p className="text-slate-400 text-xs">Update your preferences for AI recommendation matching.</p>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-4 bg-primary/10 border border-primary/20 text-primary rounded-xl text-xs font-semibold">
            Preferences updated successfully!
          </div>
        )}

        <div className="space-y-4 text-xs text-slate-300">
          {/* Budget Limit */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-semibold uppercase tracking-wider block">Max Target Budget ($ USD)</label>
            <div className="relative">
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full bg-slateCustom-800 text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
                min="500"
                required
              />
              <CircleDollarSign className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-500" />
            </div>
          </div>

          {/* Climate & Pace */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold uppercase tracking-wider block">Preferred Climate</label>
              <select
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
                className="w-full bg-slateCustom-800 text-slate-100 px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
              >
                <option value="Tropical">Tropical</option>
                <option value="Cold">Cold / Snow</option>
                <option value="Warm">Warm / Desert</option>
                <option value="Temperate">Temperate</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold uppercase tracking-wider block">Travel Intensity</label>
              <select
                value={pace}
                onChange={(e) => setPace(e.target.value)}
                className="w-full bg-slateCustom-800 text-slate-100 px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
              >
                <option value="Relaxed">Relaxed</option>
                <option value="Moderate">Moderate</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>

          {/* Interests Checkboxes */}
          <div className="space-y-2">
            <label className="text-slate-400 font-semibold uppercase tracking-wider block">Travel Interests (Select tags)</label>
            <div className="grid grid-cols-3 gap-2">
              {interestOptions.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-slateCustom-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-primary hover:bg-primary-dark text-slateCustom-900 font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6"
        >
          {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>Save Preferences</span>
        </button>
      </form>

      {/* Col 2: AI Smart Recommendations Results (7 columns) */}
      <div className="lg:col-span-7 p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/25">
              <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Recommendations Engine</h2>
              <p className="text-slate-400 text-xs">Run matchmaking heuristic agent over active listings.</p>
            </div>
          </div>
          <button
            onClick={() => getRecs()}
            disabled={recLoading}
            className="bg-secondary hover:bg-secondary-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            {recLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Matching...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Find Travel Matches</span>
              </>
            )}
          </button>
        </div>

        {/* Output area */}
        {recLoading || listingsLoading ? (
          <div className="py-16 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-secondary animate-spin" />
            <p className="text-slate-400 text-sm">Evaluating user preferences against tour database...</p>
          </div>
        ) : recData ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Intro text */}
            <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-secondary pl-3 bg-secondary/5 py-2.5 rounded-r-xl">
              {recData.personalizedIntro}
            </p>

            {/* Resolved Listings list */}
            {resolvedRecommendations.length === 0 ? (
              <p className="text-slate-500 text-sm">No matched listings found in the database. Ensure some listings exist.</p>
            ) : (
              <div className="space-y-4">
                {recData.recommendations.map((recMatch, index) => {
                  const itemDetail = resolvedRecommendations.find(l => l._id.toString() === recMatch.listingId);
                  if (!itemDetail) return null;

                  return (
                    <div key={itemDetail._id} className="p-4 rounded-xl bg-slateCustom-850/30 border border-slate-800 flex flex-col sm:flex-row gap-4 hover:border-secondary/40 transition-colors">
                      {/* Thumbnail image */}
                      <div className="w-full sm:w-28 h-20 rounded-lg overflow-hidden shrink-0">
                        <img src={itemDetail.imageUrl} alt={itemDetail.title} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Matches Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-bold text-sm">{itemDetail.title}</h4>
                            <span className="text-primary font-bold text-sm">${itemDetail.price}</span>
                          </div>
                          <p className="text-slate-400 text-[11px] leading-relaxed mt-1">{recMatch.reasoning}</p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-800/40 pt-2 mt-2">
                          <div className="flex items-center space-x-3 text-[10px] text-slate-500">
                            <span className="flex items-center"><MapPin className="w-3 h-3 text-secondary mr-0.5 shrink-0" />{itemDetail.location}</span>
                            <span>{itemDetail.duration} Days</span>
                            <span className="flex items-center"><Star className="w-3 h-3 text-yellow-400 mr-0.5 shrink-0" />{itemDetail.ratingAverage}</span>
                          </div>
                          <Link to={`/explore/${itemDetail._id}`} className="text-xs text-primary hover:text-primary-light font-bold flex items-center gap-0.5">
                            <span>Details</span>
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 border border-dashed border-slate-800 rounded-xl text-center flex flex-col items-center justify-center space-y-3">
            <Compass className="w-10 h-10 text-slate-650" />
            <p className="text-slate-400 text-sm">Save your preferences, then click "Find Travel Matches" above.</p>
            <p className="text-slate-500 text-xs max-w-sm leading-relaxed">The recommendation engine scores all active packages (Bali, Alps, Kyoto) based on budget, climate, and interest filters to select the best 3 fits.</p>
          </div>
        )}
      </div>

    </div>
  );
};
