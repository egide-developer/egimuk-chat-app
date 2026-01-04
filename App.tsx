import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { Chat } from './components/Chat';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Reels } from './components/Reels';
import { CreatePost } from './components/CreatePost';
import { CURRENT_USER, MOCK_USERS } from './constants';
import { ViewState } from './types';

/**
 * Root Application Component.
 * Manages global state for:
 * 1. Current View (Navigation)
 * 2. Theme (Light/Dark mode)
 * 3. Selected User Profile (Deep navigation)
 */
export default function App() {
  // Navigation State
  const [view, setView] = useState<ViewState>('feed');
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Profile Navigation State - determines which user profile to show
  const [selectedUserId, setSelectedUserId] = useState<string>(CURRENT_USER.id);

  // Effect to apply the dark mode class to the HTML root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  /**
   * Handler to navigate to a specific user's profile.
   * This is passed down to child components (Feed, Chat, Reels) to enable cross-component navigation.
   */
  const handleNavigateToProfile = (userId: string) => {
    setSelectedUserId(userId);
    setView('profile');
  };

  /**
   * Handler for Sidebar navigation.
   * Resets selected user to current user if navigating explicitly to 'profile' via sidebar.
   */
  const handleViewChange = (newView: ViewState) => {
    setView(newView);
    if (newView === 'profile') {
      setSelectedUserId(CURRENT_USER.id);
    }
  };

  /**
   * Conditional rendering logic based on current 'view' state.
   */
  const renderContent = () => {
    switch (view) {
      case 'feed': 
        return <Feed currentUser={CURRENT_USER} onNavigateToProfile={handleNavigateToProfile} />;
      case 'chat': 
        return <Chat currentUser={CURRENT_USER} onNavigateToProfile={handleNavigateToProfile} />;
      case 'profile': 
        // Resolve the full user object from ID, fallback to current user if not found
        const userToDisplay = MOCK_USERS.find(u => u.id === selectedUserId) || CURRENT_USER;
        return <Profile user={userToDisplay} />;
      case 'settings': 
        return <Settings currentTheme={theme} toggleTheme={toggleTheme} />;
      case 'reels': 
        return <Reels onNavigateToProfile={handleNavigateToProfile} />;
      case 'create': 
        return <CreatePost />;
      default: 
        return <Feed currentUser={CURRENT_USER} onNavigateToProfile={handleNavigateToProfile} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Sidebar handles global navigation */}
      <Sidebar currentView={view} onChangeView={handleViewChange} />
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 w-full relative">
        {renderContent()}
      </main>

      {/* Optional: Simple toast notification placeholder */}
      <div className="fixed bottom-20 md:bottom-10 right-10 z-50 pointer-events-none">
          {/* Toast logic would go here */}
      </div>
    </div>
  );
}