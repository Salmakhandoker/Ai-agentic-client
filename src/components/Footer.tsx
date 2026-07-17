import React from 'react';
import { Link } from 'react-router-dom';
import { Compass as LogoIcon, Mail, Phone, MapPin, Github, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slateCustom-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Col 1: Brand */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
              <LogoIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-widest text-white">AETHERIA</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Aetheria combines the power of Agentic AI with global experiences to deliver custom itineraries and smart matching for mindful travelers.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="w-8 h-8 rounded-lg bg-slateCustom-800 hover:bg-primary hover:text-slateCustom-900 flex items-center justify-center text-slate-400 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slateCustom-800 hover:bg-primary hover:text-slateCustom-900 flex items-center justify-center text-slate-400 transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slateCustom-800 hover:bg-primary hover:text-slateCustom-900 flex items-center justify-center text-slate-400 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slateCustom-800 hover:bg-primary hover:text-slateCustom-900 flex items-center justify-center text-slate-400 transition-all">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Explore</h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><Link to="/explore" className="hover:text-primary transition-colors">All Adventures</Link></li>
            <li><Link to="/explore?category=Adventure" className="hover:text-primary transition-colors">Active Mountaineering</Link></li>
            <li><Link to="/explore?category=Wellness" className="hover:text-primary transition-colors">Wellness Retreats</Link></li>
            <li><Link to="/explore?category=Culture" className="hover:text-primary transition-colors">Cultural Discovery</Link></li>
          </ul>
        </div>

        {/* Col 3: Support & Information */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact & Support</Link></li>
            <li><Link to="/help" className="hover:text-primary transition-colors">FAQ & Support Guide</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div className="flex flex-col space-y-3 text-slate-400 text-sm">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Office & Support</h3>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>Level 4, House 1162, Road 10, Mirpur DOHS, Dhaka</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <span>+880 1322 810864</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <span>support@aetheria-travel.ai</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs space-y-4 md:space-y-0">
        <div>
          &copy; {new Date().getFullYear()} Aetheria Travel Platform. Built for Agentic AI Excellence.
        </div>
        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:text-slate-400">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
          <a href="#" className="hover:text-slate-400">Security</a>
        </div>
      </div>
    </footer>
  );
};
