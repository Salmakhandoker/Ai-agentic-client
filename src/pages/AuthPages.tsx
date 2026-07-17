import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User, Chrome, Loader2 } from 'lucide-react';

export const AuthPages: React.FC<{ mode: 'login' | 'register' }> = ({ mode }) => {
  const { login, register, googleLogin } = useAuth();
  const navigate = useNavigate();

  // Form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Status indicators
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!username.trim()) {
          setErrorMsg('Username is required for registration.');
          setIsSubmitting(false);
          return;
        }
        await register(username, email, password);
      }
      navigate('/explore');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo Login Autofill & Action
  const handleDemoLogin = async () => {
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await login('demo@aetheria.com', 'demo1234');
      navigate('/explore');
    } catch (err: any) {
      setErrorMsg('Failed to authenticate with Demo account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulated Google Authentication Sign-In
  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      // Simulate OAuth redirect and credential retrieval
      await googleLogin('google.traveler@gmail.com', 'GoogleExplorer', 'google-oauth2|987654321');
      navigate('/explore');
    } catch (err) {
      setErrorMsg('Failed to process Google sign-in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-2xl glass-panel border border-slate-800 space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            {mode === 'login' ? 'Welcome Back' : 'Create Traveler Account'}
          </h1>
          <p className="text-slate-400 text-xs">
            {mode === 'login' ? 'Access your travel itineraries and smart matches.' : 'Join the Aetheria agentic workspace and plan your tours.'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-200 rounded-xl text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-slate-300">
          {mode === 'register' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Traveler101"
                  className="w-full bg-slateCustom-800 text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                  required
                />
                <User className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-500" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. traveler@mail.com"
                className="w-full bg-slateCustom-800 text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                required
              />
              <Mail className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-500" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slateCustom-800 text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                required
              />
              <Lock className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-dark text-slateCustom-900 font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{mode === 'login' ? 'Login' : 'Register Account'}</span>
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase font-semibold">Or Continue With</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Google OAuth & Demo buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="flex items-center justify-center space-x-2 bg-slateCustom-800 hover:bg-slateCustom-900 border border-slate-700 py-3 rounded-xl text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            <Chrome className="w-4 h-4 text-red-400 shrink-0" />
            <span>Google Sign In</span>
          </button>
          <button
            onClick={handleDemoLogin}
            disabled={isSubmitting}
            className="flex items-center justify-center space-x-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 py-3 rounded-xl text-primary text-xs font-bold transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Demo Autofill</span>
          </button>
        </div>

        {/* Toggle link */}
        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-850">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-semibold">
                Sign Up
              </Link>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Sign In
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
