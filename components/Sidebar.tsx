import React from 'react';
import { Home, MessageCircle, Film, User, Settings, PlusSquare, Compass } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'create', icon: PlusSquare, label: 'Create' },
    { id: 'reels', icon: Film, label: 'Reels' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-light-surface dark:bg-dark-surface border-r border-light-secondary/20 dark:border-dark-secondary/20 fixed left-0 top-0 z-50 p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-light-accent to-light-secondary dark:from-dark-accent dark:to-dark-secondary"></div>
          <h1 className="text-2xl font-bold tracking-tight text-light-text dark:text-dark-text">Nexus</h1>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                title={item.label}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-light-text text-light-bg dark:bg-dark-text dark:text-dark-bg font-semibold shadow-lg' 
                    : 'text-light-text dark:text-dark-text hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto px-4 py-4">
          <div className="text-xs text-light-text/50 dark:text-dark-text/50 flex flex-col gap-3">
            <div>
              <p>© 2024 Nexus Social</p>
              <p>v1.0.0</p>
            </div>
            <div className="flex flex-col gap-1">
              <a href="#" className="hover:text-light-text dark:hover:text-dark-text transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-light-text dark:hover:text-dark-text transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-lg border-t border-light-secondary/20 dark:border-dark-secondary/20 flex justify-around items-center p-3 z-50 pb-safe">
        {navItems.filter(i => i.id !== 'settings').map((item) => {
           const isActive = currentView === item.id;
           return (
             <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                title={item.label}
                className={`p-2 rounded-xl transition-all ${
                  isActive 
                    ? 'text-light-accent dark:text-dark-accent' 
                    : 'text-light-text dark:text-dark-text opacity-70'
                }`}
              >
               <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
             </button>
           )
        })}
      </div>
    </>
  );
};