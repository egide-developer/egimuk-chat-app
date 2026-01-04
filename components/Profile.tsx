import React from 'react';
import { User, Post } from '../types';
import { Settings, MapPin, Link as LinkIcon, Grid, Bookmark } from 'lucide-react';
import { INITIAL_POSTS } from '../constants';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from './Button';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const userPosts = INITIAL_POSTS.filter(p => p.authorId !== 'u1'); // Mock: showing some posts
  
  // Mock data for Recharts
  const data = [
    { name: 'Mon', engagement: 400 },
    { name: 'Tue', engagement: 300 },
    { name: 'Wed', engagement: 550 },
    { name: 'Thu', engagement: 450 },
    { name: 'Fri', engagement: 700 },
    { name: 'Sat', engagement: 850 },
    { name: 'Sun', engagement: 600 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
        <div className="relative">
             <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-[3px] bg-gradient-to-tr from-light-accent to-light-secondary dark:from-dark-accent dark:to-dark-secondary">
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover border-4 border-light-bg dark:border-dark-bg" />
             </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">{user.name}</h2>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Edit Profile</Button>
              <Button variant="icon" size="sm"><Settings size={18} /></Button>
            </div>
          </div>
          
          <div className="flex gap-6 mb-4">
            <div className="text-center md:text-left">
                <span className="font-bold block text-lg text-light-text dark:text-dark-text">124</span>
                <span className="text-xs text-light-text/60 dark:text-dark-text/60">Posts</span>
            </div>
            <div className="text-center md:text-left">
                <span className="font-bold block text-lg text-light-text dark:text-dark-text">4.5k</span>
                <span className="text-xs text-light-text/60 dark:text-dark-text/60">Followers</span>
            </div>
            <div className="text-center md:text-left">
                <span className="font-bold block text-lg text-light-text dark:text-dark-text">892</span>
                <span className="text-xs text-light-text/60 dark:text-dark-text/60">Following</span>
            </div>
          </div>

          <div className="space-y-1">
             <p className="text-light-text dark:text-dark-text font-medium">{user.bio}</p>
             <div className="flex items-center gap-4 text-sm text-light-text/60 dark:text-dark-text/60">
                <span className="flex items-center gap-1"><MapPin size={14} /> New York, NY</span>
                <span className="flex items-center gap-1"><LinkIcon size={14} /> portfolio.io</span>
             </div>
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="mb-10 p-6 bg-light-surface dark:bg-dark-surface rounded-2xl shadow-sm border border-light-secondary/10 dark:border-dark-secondary/10">
        <h3 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">Weekly Engagement</h3>
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', background: '#333', color: '#fff' }}
                        cursor={{fill: 'transparent'}}
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                    <Bar dataKey="engagement" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 5 ? '#E07A5F' : '#7A8C6E'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="border-t border-light-secondary/20 dark:border-dark-secondary/20 mb-6">
        <div className="flex justify-center gap-12">
            <button className="flex items-center gap-2 py-4 border-t-2 border-light-text dark:border-dark-text text-light-text dark:text-dark-text font-semibold text-xs uppercase tracking-widest">
                <Grid size={14} /> Posts
            </button>
            <button className="flex items-center gap-2 py-4 border-t-2 border-transparent text-light-text/50 dark:text-dark-text/50 font-medium text-xs uppercase tracking-widest hover:text-light-text dark:hover:text-dark-text">
                <Bookmark size={14} /> Saved
            </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {userPosts.concat(userPosts).map((post, idx) => (
            <div key={idx} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-sm md:rounded-xl overflow-hidden relative group cursor-pointer">
                <img src={post.imageUrl || `https://picsum.photos/400/400?random=${idx+50}`} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold">
                    <span className="flex items-center gap-1"><div className="w-4 h-4 bg-white rounded-full" /> {post.likes}</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};