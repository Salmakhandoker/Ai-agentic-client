import React from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AiChatConcierge } from './components/AiChatConcierge';

// Page Imports
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { DetailsPage } from './pages/DetailsPage';
import { AddListingPage } from './pages/AddListingPage';
import { ManageListingsPage } from './pages/ManageListingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPages } from './pages/AuthPages';
import { AboutPage, ContactPage, HelpPage, PrivacyPage } from './pages/StaticPages';

export const App: React.FC = () => {
  // Capture active listing ID from route context for global AI Chat Concierge
  const detailsPageMatch = useMatch('/explore/:id');
  const activeListingId = detailsPageMatch?.params.id;

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore/:id" element={<DetailsPage />} />
            <Route path="/items/add" element={<AddListingPage />} />
            <Route path="/items/manage" element={<ManageListingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<AuthPages mode="login" />} />
            <Route path="/register" element={<AuthPages mode="register" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </main>

        {/* Global AI Chat Concierge Drawer */}
        <AiChatConcierge activeListingId={activeListingId} />

        {/* Footer Area */}
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
