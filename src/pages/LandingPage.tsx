import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Compass, Calendar, ArrowRight, Zap, Target, Star, ChevronDown, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const LandingPage: React.FC = () => {
  const chartData = [
    { year: '2021', accuracy: 68, cost: 90 },
    { year: '2022', accuracy: 72, cost: 75 },
    { year: '2023', accuracy: 81, cost: 58 },
    { year: '2024', accuracy: 94, cost: 35 },
    { year: '2025', accuracy: 98, cost: 15 },
  ];

  const testimonials = [
    { name: 'Sarah Connor', role: 'Adventure Enthusiast', text: 'Aetheria recommended an incredible Costa Rica trip and the AI-generated itinerary was flawless. It saved me hours of planning!', rating: 5 },
    { name: 'John Doe', role: 'Cultural Explorer', text: 'The custom Kyoto itinerary was tailored perfectly to my moderate pace and budget. The concierge answered all of my questions.', rating: 5 },
    { name: 'Elena Rostova', role: 'Wellness Seeker', text: 'I filled out my traveler profile and was matched with the Bali retreat. The absolute best vacation of my life.', rating: 5 },
  ];

  const faqs = [
    { q: 'How does the Agentic AI Recommendation Engine work?', a: 'By analyzing your travel preferences (budget, climate, pace, and interest tags), our system executes scoring heuristics to select and explain the ideal options from our active listings database.' },
    { q: 'Can I generate and edit travel schedules?', a: 'Yes! The AI Itinerary Planner generates day-by-day itineraries, packing lists, and safety guidelines. You can adjust the pace and theme to regenerate them instantly.' },
    { q: 'Is there a cost to use the AI Concierge?', a: 'No, the AI Concierge is completely integrated into Aetheria for all registered users to assist with listing details and bookings.' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#090D17] to-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-12 left-1/4 w-72 h-72 bg-primary/10 rounded-full filter blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-secondary/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 animate-bounce">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Next-Gen Agentic Travel</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl">
            Explore the World with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-400 to-secondary">
              AI-Guided Agents
            </span>
          </h1>

          <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Discover tailored adventure packages, auto-generate rich day-by-day itineraries, and chat with an assistant that knows exactly what you need.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/explore"
              className="bg-primary hover:bg-primary-dark text-slateCustom-900 px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-primary/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Explore Adventures</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="bg-slateCustom-800 hover:bg-slateCustom-800/80 border border-slate-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center"
            >
              Sign Up Free
            </Link>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-500" />
        </div>
      </section>

      {/* 2. Overview / Welcome Section */}
      <section className="py-20 border-t border-slate-900 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl font-extrabold text-white">Redefining Vacation Planning</h2>
            <p className="text-slate-400 leading-relaxed">
              Standard agencies force you into pre-packaged tours. Traditional travel search engines overwhelm you with thousands of reviews. 
            </p>
            <p className="text-slate-400 leading-relaxed font-semibold text-slate-300">
              Aetheria is built differently. We connect deep LLM capabilities with a clean listing platform. You build a profile, we match you instantly, and our agents generate day-by-day activities optimized for your pace and focus.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-300 text-sm">No Placeholders</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-300 text-sm">100% Customization</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-300 text-sm">Full Context Chat</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-300 text-sm">Atlas Powered</span>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl glass-panel relative">
            <div className="h-64 rounded-xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80')` }}></div>
            <div className="absolute -bottom-4 -left-4 bg-primary/20 backdrop-blur-md border border-primary/30 p-4 rounded-xl flex items-center space-x-3">
              <Compass className="w-8 h-8 text-primary animate-spin" style={{ animationDuration: '10s' }} />
              <div>
                <p className="text-xs text-slate-400">Total Destinations</p>
                <p className="text-base font-bold text-white">8 Seeded Havens</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Core Agentic Features</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Explore the agentic integrations that make Aetheria travel planning simple and personalized.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white">Itinerary Generator</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Auto-generate custom day plans, items to pack, and safety directions directly tailored to your trip focus and pace.
            </p>
          </div>
          <div className="p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col space-y-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
              <Target className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-white">Smart Match Recommendations</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fill out your traveler preferences. The engine reads our packages and explains why they match your interests and budget.
            </p>
          </div>
          <div className="p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white">Conversational Concierge</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Floating chat widget that understands what page you are on, details of the open package, and guides you to book.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Categories Section */}
      <section className="py-20 bg-background/50 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Seeded Categories</h2>
          <p className="text-slate-400">Discover packages classified automatically for travel styles.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { cat: 'Wellness', count: 'Bali Retreats', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80' },
            { cat: 'Adventure', count: 'Alps & Canopy', img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80' },
            { cat: 'Culture', count: 'Kyoto & Giza', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80' },
            { cat: 'Nature', count: 'Iceland & Patagonia', img: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=400&q=80' }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={`/explore?category=${item.cat}`}
              className="group relative h-60 rounded-2xl overflow-hidden shadow-lg border border-slate-800 transform hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.img}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slateCustom-900 via-slateCustom-900/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h4 className="text-white font-bold text-lg group-hover:text-primary transition-colors">{item.cat}</h4>
                <p className="text-xs text-slate-300">{item.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Statistics / Charts Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl font-extrabold text-white">AI Optimization Report</h2>
            <p className="text-slate-400 leading-relaxed">
              Our Agentic Engine continuously learns from user feedback (likes, dislikes, custom prompt alterations) to provide highly accurate recommendations and reduce planning overhead.
            </p>
            <div className="flex space-x-8 pt-4">
              <div>
                <p className="text-3xl font-extrabold text-primary">98%</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Profile Match Rate</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-secondary">3x</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Faster Planning Time</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">8</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Global Destinations</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl glass-panel">
            <h4 className="text-white font-bold text-sm mb-4">Planning Accuracy & Cost Reduction Curve</h4>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="year" stroke="#475569" fontSize={10} />
                  <YAxis stroke="#475569" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#161D30', borderColor: '#1F293D', color: '#fff', borderRadius: 8 }} />
                  <Area type="monotone" dataKey="accuracy" name="Match Accuracy %" stroke="#05B284" fillOpacity={0.2} fill="url(#colorAcc)" />
                  <Area type="monotone" dataKey="cost" name="Planning Costs $" stroke="#6366F1" fillOpacity={0.1} fill="url(#colorCost)" />
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#05B284" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#05B284" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-20 bg-background/50 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Feedback from Adventurers</h2>
          <p className="text-slate-400">Discover experiences created by our members.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="p-8 rounded-2xl glass-panel flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex space-x-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">"{test.text}"</p>
              </div>
              <div className="pt-6 border-t border-slate-800/60 mt-6 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slateCustom-800 flex items-center justify-center text-primary font-bold">
                  {test.name[0]}
                </div>
                <div>
                  <h5 className="text-white font-bold text-sm">{test.name}</h5>
                  <p className="text-slate-500 text-xs">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-20 bg-background border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400">Find details regarding itineraries and profile setups.</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl glass-panel space-y-2">
                <h4 className="text-white font-semibold text-base">{faq.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter / Call to Action */}
      <section className="py-20 bg-gradient-to-t from-[#0A0D17] to-background border-t border-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Start Planning Your Next Journey</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Create an account, select your travel style, and let Aetheria match you with adventures and customized day plans.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-slateCustom-800 text-slate-100 text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
            />
            <Link
              to="/register"
              className="bg-primary hover:bg-primary-dark text-slateCustom-900 px-6 py-3 rounded-xl text-sm font-bold shadow-md cursor-pointer whitespace-nowrap"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
