import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, Calendar, Star, CircleDollarSign, Clock, Users, ShieldAlert, Sparkles, Send, Tag, HelpCircle, User, Loader2 } from 'lucide-react';

interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface Listing {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  date: string;
  category: string;
  location: string;
  imageUrl: string;
  duration: number;
  difficulty: string;
  groupSize: number;
  ratingAverage: number;
  reviews: Review[];
}

interface ItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
}

interface GeneratedItinerary {
  highlights: string[];
  itinerary: ItineraryDay[];
  packingList: string[];
  safetyTips: string[];
}

export const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Tab State for AI widget
  const [aiPace, setAiPace] = useState('Moderate');
  const [aiFocus, setAiFocus] = useState('Adventure');
  const [aiDuration, setAiDuration] = useState('5');
  const [activeAiTab, setActiveAiTab] = useState<'itinerary' | 'packing' | 'safety'>('itinerary');

  // Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Fetch listing details
  const { data, isLoading, error } = useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const res = await axios.get(`/listings/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  // AI Itinerary mutation
  const aiMutation = useMutation<GeneratedItinerary, Error, any>({
    mutationFn: async (payload) => {
      const res = await axios.post('/ai/generate-itinerary', payload);
      return res.data;
    }
  });

  // Add review mutation
  const reviewMutation = useMutation<any, Error, { rating: number; comment: string }>({
    mutationFn: async (payload) => {
      const res = await axios.post(`/listings/${id}/reviews`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing', id] });
      setReviewComment('');
      setReviewRating(5);
    }
  });

  const handleGenerateItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing) return;
    aiMutation.mutate({
      listingId: listing._id,
      title: listing.title,
      description: listing.fullDescription,
      duration: Number(aiDuration),
      pace: aiPace,
      focus: aiFocus
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    reviewMutation.mutate({ rating: reviewRating, comment: reviewComment });
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center flex-col space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <span className="text-slate-400 text-sm">Loading adventure details...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Adventure Not Found</h2>
        <p className="text-slate-400 mb-8">The trip you are looking for does not exist or has been deleted.</p>
        <Link to="/explore" className="bg-primary text-slateCustom-900 px-6 py-3 rounded-xl font-bold">
          Back to Explore
        </Link>
      </div>
    );
  }

  const listing: Listing = data.listing;
  const relatedListings: Listing[] = data.relatedListings || [];

  // Initialize duration setting on loaded details
  if (aiDuration === '5' && listing.duration !== 5) {
    setAiDuration(String(listing.duration));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Header & Image Banner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery / Image Slider Grid */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative group">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slateCustom-900 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
            <span className="bg-primary/90 text-slateCustom-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow">
              {listing.category}
            </span>
            <span className="bg-slateCustom-900/90 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700">
              {listing.location}
            </span>
          </div>
        </div>

        {/* Action / Specs Overview Panel */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-panel flex flex-col justify-between h-full min-h-[400px] border border-slate-800">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Adventure Package</span>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span className="text-sm font-bold text-slate-200">{listing.ratingAverage} ({listing.reviews.length} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-wide leading-tight">
              {listing.title}
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {listing.shortDescription}
            </p>

            {/* Specifications Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-3 bg-slateCustom-800/60 border border-slate-700/50 rounded-xl flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Duration</p>
                  <p className="text-sm font-bold text-white">{listing.duration} Days</p>
                </div>
              </div>

              <div className="p-3 bg-slateCustom-800/60 border border-slate-700/50 rounded-xl flex items-center space-x-3">
                <Tag className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Difficulty</p>
                  <p className="text-sm font-bold text-white">{listing.difficulty}</p>
                </div>
              </div>

              <div className="p-3 bg-slateCustom-800/60 border border-slate-700/50 rounded-xl flex items-center space-x-3">
                <Users className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Group Size</p>
                  <p className="text-sm font-bold text-white">Up to {listing.groupSize} Pax</p>
                </div>
              </div>

              <div className="p-3 bg-slateCustom-800/60 border border-slate-700/50 rounded-xl flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Start Date</p>
                  <p className="text-sm font-bold text-white">{new Date(listing.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Booking */}
          <div className="border-t border-slate-800 pt-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Price per person</p>
              <div className="text-3xl font-extrabold text-white flex items-center mt-1">
                <CircleDollarSign className="w-7 h-7 text-primary mr-1 shrink-0" />
                <span>${listing.price}</span>
              </div>
            </div>
            <button
              onClick={() => alert('Booking simulator triggered! Speak to the AI Concierge in the bottom right corner for assistant guidelines.')}
              className="bg-primary hover:bg-primary-dark text-slateCustom-900 px-8 py-3.5 rounded-xl text-base font-bold shadow-lg shadow-primary/10 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Book Adventure
            </button>
          </div>
        </div>
      </div>

      {/* 2. Detailed Full Description */}
      <section className="py-8 border-t border-slate-800/60">
        <h2 className="text-xl font-bold text-white mb-4">Description & Highlights</h2>
        <div className="prose prose-invert max-w-none text-slate-350 text-sm leading-relaxed space-y-4">
          <p>{listing.fullDescription}</p>
          <div className="p-4 bg-slateCustom-800/40 rounded-xl border border-slate-800 flex items-start space-x-3 mt-4">
            <ShieldAlert className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400">
              Note: Full guided tour services, emergency medical dispatch, standard dining options, and specialized gear rentals are entirely included in the listed package price. Check the AI Itinerary widget below to configure custom packing lists.
            </p>
          </div>
        </div>
      </section>

      {/* 3. AI ITINERARY GENERATOR WIDGET (Agentic Feature) */}
      <section className="p-8 rounded-2xl glass-panel border border-slate-800 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full filter blur-[60px]"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-6 mb-6">
          <div className="space-y-1.5 mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span>AI Itinerary & Packing Planner</span>
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Auto-generate and model custom day plans, checklists, and safety guidelines for this trip.
            </p>
          </div>
          <form onSubmit={handleGenerateItinerary} className="flex flex-wrap items-center gap-3">
            <div>
              <select
                value={aiDuration}
                onChange={(e) => setAiDuration(e.target.value)}
                className="bg-slateCustom-800 text-slate-100 text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
              >
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
                <option value="9">9 Days</option>
              </select>
            </div>
            <div>
              <select
                value={aiPace}
                onChange={(e) => setAiPace(e.target.value)}
                className="bg-slateCustom-800 text-slate-100 text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
              >
                <option value="Relaxed">Relaxed Pace</option>
                <option value="Moderate">Moderate Pace</option>
                <option value="Active">Active Pace</option>
              </select>
            </div>
            <div>
              <select
                value={aiFocus}
                onChange={(e) => setAiFocus(e.target.value)}
                className="bg-slateCustom-800 text-slate-100 text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
              >
                <option value="Adventure">Adventure</option>
                <option value="Culture">Culture</option>
                <option value="Food">Food / Gastronomy</option>
                <option value="Wellness">Wellness</option>
                <option value="Relaxation">Relaxation</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={aiMutation.isPending}
              className="bg-primary hover:bg-primary-dark text-slateCustom-900 text-xs font-bold px-4 py-2 rounded-xl shadow cursor-pointer flex items-center gap-1.5"
            >
              {aiMutation.isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Planning...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{aiMutation.data ? 'Regenerate' : 'Generate'}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generator Output */}
        {aiMutation.data ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Highlights banner */}
            <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 flex flex-col space-y-2">
              <h4 className="text-sm font-bold text-primary uppercase tracking-wider">AI Highlights Summary</h4>
              <ul className="list-disc pl-5 text-slate-300 text-xs space-y-1">
                {aiMutation.data.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>

            {/* Tabs Selector */}
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => setActiveAiTab('itinerary')}
                className={`py-2.5 px-5 font-bold text-xs uppercase border-b-2 tracking-wider transition-colors ${activeAiTab === 'itinerary' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Day-by-Day Schedule
              </button>
              <button
                onClick={() => setActiveAiTab('packing')}
                className={`py-2.5 px-5 font-bold text-xs uppercase border-b-2 tracking-wider transition-colors ${activeAiTab === 'packing' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Packing Checklist ({aiMutation.data.packingList.length})
              </button>
              <button
                onClick={() => setActiveAiTab('safety')}
                className={`py-2.5 px-5 font-bold text-xs uppercase border-b-2 tracking-wider transition-colors ${activeAiTab === 'safety' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Safety Guidelines
              </button>
            </div>

            {/* Tab Contents */}
            {activeAiTab === 'itinerary' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiMutation.data.itinerary.map((day) => (
                  <div key={day.day} className="p-5 bg-slateCustom-800/40 border border-slate-800 rounded-xl space-y-3">
                    <h5 className="text-white font-bold text-sm tracking-wide border-b border-slate-800 pb-2">{day.title}</h5>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-0.5">Morning</span>
                        <p className="text-slate-300 leading-relaxed">{day.morning}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-wider block mb-0.5">Afternoon</span>
                        <p className="text-slate-300 leading-relaxed">{day.afternoon}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-0.5">Evening</span>
                        <p className="text-slate-300 leading-relaxed">{day.evening}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeAiTab === 'packing' && (
              <div className="p-4 bg-slateCustom-800/20 border border-slate-850 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aiMutation.data.packingList.map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-slate-300 text-xs">
                    <input type="checkbox" className="rounded bg-slateCustom-800 border-slate-700 text-primary focus:ring-0 focus:ring-offset-0 w-4 h-4 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeAiTab === 'safety' && (
              <div className="p-4 bg-slateCustom-800/20 border border-slate-850 rounded-xl space-y-3">
                {aiMutation.data.safetyTips.map((tip, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-slate-350 text-xs leading-relaxed">
                    <ShieldAlert className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 border border-dashed border-slate-800 rounded-xl text-center flex flex-col items-center justify-center space-y-3">
            <HelpCircle className="w-8 h-8 text-slate-600" />
            <span className="text-slate-450 text-sm">Need a custom Day-by-Day itinerary or a specific packing checklist?</span>
            <button
              onClick={() => aiMutation.mutate({
                listingId: listing._id,
                title: listing.title,
                description: listing.fullDescription,
                duration: listing.duration,
                pace: 'Moderate',
                focus: listing.category === 'Wellness' ? 'Wellness' : 'Adventure'
              })}
              className="bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Auto-Generate Full Itinerary
            </button>
          </div>
        )}
      </section>

      {/* 4. Reviews & Ratings Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-slate-800/60 pt-10">
        {/* Reviews List */}
        <div className="md:col-span-7 space-y-6">
          <h3 className="text-xl font-bold text-white">Reviews & Travelers Feedback</h3>
          {listing.reviews.length === 0 ? (
            <p className="text-slate-500 text-sm">No reviews posted yet. Be the first to review this adventure!</p>
          ) : (
            <div className="space-y-4">
              {listing.reviews.map((rev, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slateCustom-800/40 border border-slate-850 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-slateCustom-800 flex items-center justify-center text-primary font-bold text-sm">
                        {rev.username[0]}
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm">{rev.username}</h5>
                        <p className="text-[10px] text-slate-500">{new Date(rev.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-350 text-xs leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Review Form */}
        <div className="md:col-span-5 p-6 rounded-2xl glass-panel h-fit border border-slate-800">
          <h4 className="text-white font-bold text-base mb-4">Post a Review</h4>
          {user ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-slate-400 text-xs block mb-1">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="focus:outline-none cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${reviewRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-1">Feedback Comment</label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share details of your experience with other travelers..."
                  className="w-full bg-slateCustom-800 text-slate-100 text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={reviewMutation.isPending || !reviewComment.trim()}
                className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-slateCustom-900 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {reviewMutation.isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <User className="w-8 h-8 text-slate-650 mx-auto" />
              <p className="text-slate-400 text-xs leading-relaxed">
                You must be logged in to post reviews. Please sign in with a traveler account.
              </p>
              <Link
                to="/login"
                className="inline-block bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-xl"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 5. Related Items Section */}
      {relatedListings.length > 0 && (
        <section className="border-t border-slate-800/60 pt-10">
          <h3 className="text-xl font-bold text-white mb-6">Related Packages</h3>
          {/* Card Rules: Same height, width, border-radius as ExplorePage grid. Desktop: 4 cards/row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {relatedListings.map((item) => (
              <div
                key={item._id}
                className="h-[440px] rounded-2xl glass-panel shadow-md border border-slate-800/80 flex flex-col overflow-hidden group transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slateCustom-900/80 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-700 text-xs font-semibold text-primary">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate max-w-[110px]">{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                        <span>{item.duration} Days</span>
                      </div>
                    </div>

                    <h3 className="text-white font-bold text-sm tracking-wide line-clamp-1 mb-1.5 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-3">
                      {item.shortDescription}
                    </p>
                  </div>

                  <div className="border-t border-slate-800/60 pt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Price</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Rating</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-base font-extrabold text-white flex items-center">
                        <CircleDollarSign className="w-4 h-4 text-primary mr-0.5 shrink-0" />
                        <span>${item.price}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        <span className="text-xs font-bold text-slate-200">{item.ratingAverage}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 shrink-0">
                  <a
                    href={`/explore/${item._id}`}
                    className="w-full bg-slateCustom-800 hover:bg-primary hover:text-slateCustom-900 border border-slate-700 hover:border-transparent text-center block text-slate-200 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
