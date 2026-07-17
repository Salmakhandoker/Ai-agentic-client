import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, SlidersHorizontal, MapPin, Calendar, Star, CircleDollarSign, Clock, UserRound } from 'lucide-react';

interface Listing {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  date: string;
  category: string;
  location: string;
  imageUrl: string;
  duration: number;
  difficulty: string;
  ratingAverage: number;
}

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search/Filters/Pagination State from URL params or local fallback
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [rating, setRating] = useState(searchParams.get('rating') || '');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'date_desc');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  const limit = 12;

  // React Query fetch listings
  const { data, isLoading, error } = useQuery({
    queryKey: ['listings', search, category, location, minPrice, maxPrice, rating, difficulty, sort, page],
    queryFn: async () => {
      const params: any = { page, limit };
      if (search) params.q = search;
      if (category) params.category = category;
      if (location) params.location = location;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (rating) params.rating = rating;
      if (difficulty) params.difficulty = difficulty;
      if (sort) params.sort = sort;

      const res = await axios.get('/listings', { params });
      return res.data;
    }
  });

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams: any = { page: '1' };
    if (search) newParams.q = search;
    if (category) newParams.category = category;
    if (location) newParams.location = location;
    if (minPrice) newParams.minPrice = minPrice;
    if (maxPrice) newParams.maxPrice = maxPrice;
    if (rating) newParams.rating = rating;
    if (difficulty) newParams.difficulty = difficulty;
    if (sort) newParams.sort = sort;

    setSearchParams(newParams);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setRating('');
    setDifficulty('');
    setSort('date_desc');
    setPage(1);
    setSearchParams({});
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  };

  const listings = data?.listings || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-white mb-2">Explore Adventures</h1>
        <p className="text-slate-400">Discover handpicked travel packages curated with detail.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <form onSubmit={handleApplyFilters} className="p-6 rounded-2xl glass-panel h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Filters</span>
            </h3>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs text-primary hover:text-primary-light transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Search</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Keywords, country..."
                className="w-full bg-slateCustom-800 text-slate-100 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slateCustom-800 text-slate-100 text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="">All Categories</option>
              <option value="Wellness">Wellness</option>
              <option value="Adventure">Adventure</option>
              <option value="Culture">Culture</option>
              <option value="Nature">Nature</option>
              <option value="Relaxation">Relaxation</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Price Budget</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="w-1/2 bg-slateCustom-800 text-slate-100 text-sm px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="w-1/2 bg-slateCustom-800 text-slate-100 text-sm px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Minimum Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full bg-slateCustom-800 text-slate-100 text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="">Any Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.7">4.7+ Stars</option>
              <option value="4.8">4.8+ Stars</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slateCustom-800 text-slate-100 text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="">Any Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
            </select>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-slateCustom-800 text-slate-100 text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="date_desc">Latest Adventures</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Shortest Trips First</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-slateCustom-900 font-bold py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            Apply Filters
          </button>
        </form>

        {/* Listings Grid Area */}
        <div className="lg:col-span-3 space-y-8">
          {isLoading ? (
            // Skeleton Loader (4 columns matching desktop row grid layout)
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-[420px] rounded-2xl bg-slateCustom-800/40 border border-slate-800 animate-pulse flex flex-col justify-between p-4">
                  <div className="w-full h-44 rounded-xl bg-slateCustom-800"></div>
                  <div className="space-y-3 flex-1 mt-4">
                    <div className="h-4 w-3/4 bg-slateCustom-800 rounded"></div>
                    <div className="h-3 w-1/2 bg-slateCustom-800 rounded"></div>
                    <div className="h-8 w-full bg-slateCustom-800 rounded"></div>
                  </div>
                  <div className="h-10 w-full bg-slateCustom-800 rounded-xl mt-4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center glass-panel rounded-2xl">
              <p className="text-red-400">Failed to load adventure listings. Please try again later.</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="p-16 text-center glass-panel rounded-2xl flex flex-col items-center space-y-4">
              <span className="text-slate-500 text-lg">No adventures found matching your active filters.</span>
              <button
                onClick={handleClearFilters}
                className="bg-slateCustom-800 hover:bg-slateCustom-900 border border-slate-700 text-slate-200 px-5 py-2.5 rounded-xl text-sm"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            // Cards Grid (4 per row on wide desktops)
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {listings.map((item: Listing) => (
                <div
                  key={item._id}
                  className="h-[440px] rounded-2xl glass-panel shadow-md hover:shadow-primary/5 border border-slate-800/80 flex flex-col overflow-hidden group transform hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Card Image */}
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slateCustom-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-xs font-semibold text-primary">
                      {item.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta Info: Location / Duration */}
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

                      {/* Title */}
                      <h3 className="text-white font-bold text-sm tracking-wide line-clamp-1 mb-1.5 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-3">
                        {item.shortDescription}
                      </p>
                    </div>

                    {/* Price, Difficulty, Rating */}
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

                  {/* View Details Button */}
                  <div className="p-4 pt-0 shrink-0">
                    <Link
                      to={`/explore/${item._id}`}
                      className="w-full bg-slateCustom-800 hover:bg-primary hover:text-slateCustom-900 border border-slate-700 hover:border-transparent text-center block text-slate-200 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Component */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-6">
              <button
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="bg-slateCustom-800 hover:bg-slateCustom-900 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                Previous
              </button>
              {[...Array(pagination.pages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all ${
                    page === i + 1
                      ? 'gradient-bg border-transparent text-white'
                      : 'bg-slateCustom-800 border-slate-700 text-slate-300 hover:bg-slateCustom-900'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(Math.min(pagination.pages, page + 1))}
                disabled={page === pagination.pages}
                className="bg-slateCustom-800 hover:bg-slateCustom-900 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
