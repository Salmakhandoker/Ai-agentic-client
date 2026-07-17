import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Compass, PlusCircle, LayoutDashboard, User, LogOut, Compass as LogoIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const activeStyle = "text-primary border-b-2 border-primary pb-1 font-semibold";
  const inactiveStyle = "text-slate-300 hover:text-primary transition-colors pb-1";

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-md transform group-hover:rotate-12 transition-transform duration-300">
              <LogoIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-primary">
              AETHERIA
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Home</NavLink>
            <NavLink to="/explore" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Explore</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Contact</NavLink>

            {user && (
              <>
                <NavLink to="/items/add" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Add Adventure</NavLink>
                <NavLink to="/items/manage" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Manage</NavLink>
              </>
            )}
          </div>

          {/* Auth Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 bg-slateCustom-800 hover:bg-slateCustom-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-200 text-sm transition-all">
                  <User className="w-4 h-4 text-primary" />
                  <span>{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 px-4 py-2 rounded-xl text-red-200 text-sm transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-all">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-primary hover:bg-primary-dark text-slateCustom-900 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 pt-2 pb-4 space-y-2 shadow-2xl transition-all duration-300">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block px-3 py-2 rounded-xl text-base font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-slateCustom-800'}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block px-3 py-2 rounded-xl text-base font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-slateCustom-800'}`}
          >
            Explore
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block px-3 py-2 rounded-xl text-base font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-slateCustom-800'}`}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block px-3 py-2 rounded-xl text-base font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-slateCustom-800'}`}
          >
            Contact
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/items/add"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-xl text-base font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-slateCustom-800'}`}
              >
                Add Adventure
              </NavLink>
              <NavLink
                to="/items/manage"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-xl text-base font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-slateCustom-800'}`}
              >
                Manage Listings
              </NavLink>
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-xl text-base font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-slateCustom-800'}`}
              >
                Traveler Profile
              </NavLink>
            </>
          )}

          <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 py-3 rounded-xl text-red-200 text-base transition-all font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-slate-300 py-3 rounded-xl hover:bg-slateCustom-800 border border-transparent font-medium"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-primary hover:bg-primary-dark text-slateCustom-900 py-3 rounded-xl font-bold shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
