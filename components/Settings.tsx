import React from 'react';
import { Moon, Sun, Bell, Lock, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Button } from './Button';

interface SettingsProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ currentTheme, toggleTheme }) => {
  const sections = [
    {
      title: 'Preferences',
      items: [
        { 
          icon: currentTheme === 'light' ? Moon : Sun, 
          label: 'Appearance', 
          value: currentTheme === 'light' ? 'Light Mode' : 'Dark Mode',
          action: toggleTheme
        },
        { icon: Bell, label: 'Notifications', value: 'On' },
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        { icon: Lock, label: 'Privacy', value: '' },
        { icon: Shield, label: 'Security', value: '' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', value: '' },
      ]
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-8 text-light-text dark:text-dark-text">Settings</h2>
      
      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-sm font-semibold text-light-accent dark:text-dark-accent uppercase tracking-wider mb-4 px-2">{section.title}</h3>
            <div className="bg-light-surface dark:bg-dark-surface rounded-2xl overflow-hidden shadow-sm border border-light-secondary/10 dark:border-dark-secondary/10">
              {section.items.map((item, itemIdx) => (
                <button 
                  key={itemIdx}
                  onClick={item.action}
                  className={`w-full flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${itemIdx !== section.items.length - 1 ? 'border-b border-light-secondary/10 dark:border-dark-secondary/10' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
                        <item.icon size={20} />
                    </div>
                    <span className="font-medium text-light-text dark:text-dark-text">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-light-text/50 dark:text-dark-text/50">{item.value}</span>
                    <svg className="w-5 h-5 text-light-text/30 dark:text-dark-text/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-8">
            <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                <LogOut size={20} className="mr-2" /> Log Out
            </Button>
        </div>
      </div>
    </div>
  );
};