import React from 'react';
import { Compass, Mail, Phone, MapPin, CheckCircle, Shield, Globe } from 'lucide-react';

// 1. About Page Component
export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">About Aetheria</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          Connecting Large Language Models with global travel planning, making adventures responsive and personal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <h3 className="text-xl font-bold text-white">Our Mission</h3>
          <p>
            Aetheria was founded to break the mold of static travel brochures. By leveraging advanced Agentic AI reasoning capabilities, we allow travelers to create custom day-by-day programs and receive profile-matched tour packages.
          </p>
          <p>
            Every itinerary generated takes physical fitness levels, activity speeds, and focused interests (wellness, culinary, historical) into account, producing realistic, safe, and highly enjoyable plans.
          </p>
        </div>
        <div className="p-6 rounded-2xl glass-panel relative">
          <div className="h-64 rounded-xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80')` }}></div>
        </div>
      </div>
    </div>
  );
};

// 2. Contact Page Component
export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
      <div className="md:col-span-5 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Get in Touch</h1>
          <p className="text-slate-400 text-xs mt-1">Our support representatives are active 6 days a week.</p>
        </div>

        <div className="space-y-4 text-sm text-slate-350">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h5 className="text-white font-bold text-sm">Office Headquarters</h5>
              <p className="text-xs mt-0.5">Level 4, House 1162, Road 10, Avenue 12, Mirpur DOHS, Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h5 className="text-white font-bold text-sm">Helpline Numbers</h5>
              <p className="text-xs mt-0.5">+880 1322 810864</p>
              <p className="text-xs">+880 1335 106731</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h5 className="text-white font-bold text-sm">Support Channels</h5>
              <p className="text-xs mt-0.5">web@programming-hero.com</p>
              <p className="text-xs">support@aetheria.travel.ai</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-7 p-6 rounded-2xl glass-panel border border-slate-800">
        <h4 className="text-white font-bold text-base mb-4">Send a Message</h4>
        <form className="space-y-4 text-xs text-slate-300">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">Your Name</label>
              <input type="text" placeholder="e.g. John" className="w-full bg-slateCustom-800 text-slate-100 p-2.5 rounded-xl border border-slate-700 focus:outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">Email Address</label>
              <input type="email" placeholder="e.g. john@mail.com" className="w-full bg-slateCustom-800 text-slate-100 p-2.5 rounded-xl border border-slate-700 focus:outline-none" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 font-semibold">Message Subject</label>
            <input type="text" placeholder="e.g. Booking inquiry" className="w-full bg-slateCustom-800 text-slate-100 p-2.5 rounded-xl border border-slate-700 focus:outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 font-semibold">Message Content</label>
            <textarea rows={4} placeholder="Describe your request..." className="w-full bg-slateCustom-800 text-slate-100 p-2.5 rounded-xl border border-slate-700 focus:outline-none resize-none" />
          </div>
          <button type="button" onClick={() => alert('Message mock submitted!')} className="w-full bg-primary hover:bg-primary-dark text-slateCustom-900 font-bold py-3 rounded-xl transition-all cursor-pointer">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

// 3. Help / Support Page Component
export const HelpPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Help & Support Guide</h1>
        <p className="text-slate-400 text-sm">Everything you need to know about Aetheria Agentic Travel.</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-xl glass-panel space-y-2">
          <h4 className="text-white font-bold text-sm">1. How do I configure my Travel Profile?</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Click your username in the navbar to open your traveler profile settings page. From there, you can adjust your budget limits, select preferred climate settings, select interest tags (Wellness, Nature, Adventure), and preferred activity pace. Saving this immediately updates recommendations.
          </p>
        </div>
        <div className="p-6 rounded-xl glass-panel space-y-2">
          <h4 className="text-white font-bold text-sm">2. What happens if the Gemini API Key is missing?</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Nothing crashes! Aetheria features a high-fidelity local Agentic rule-and-heuristic simulator. If no API key is specified in the environment, the server computes profile matching, details indexing, and chat responses locally, maintaining full site interactivity out-of-the-box.
          </p>
        </div>
      </div>
    </div>
  );
};

// 4. Privacy / Terms Page Component
export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
      <h1 className="text-3xl font-extrabold text-white border-b border-slate-800 pb-4">Privacy Policy</h1>
      <p className="text-slate-400 text-xs leading-relaxed">
        Last Updated: July 2026. 
      </p>
      <div className="space-y-4 text-slate-300 text-xs leading-relaxed">
        <p>
          At Aetheria, we prioritize traveler privacy. The data stored in our database (emails, profiles, adventure packages) is used strictly to run core applications and calculate travel recommendation matching.
        </p>
        <p>
          No user profile parameters are ever shared with third-party advertising companies. If a live Gemini API key is configured, relevant search queries are forwarded securely to the Google Generative AI endpoints to formulate custom day-by-day itineraries.
        </p>
      </div>
    </div>
  );
};
