import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Plus, Flag, UserMinus, Link as LinkIcon, Trash2 } from 'lucide-react';
import { Post, User, Story } from '../types';
import { INITIAL_POSTS, INITIAL_STORIES, MOCK_USERS } from '../constants';
import { Button } from './Button';

interface FeedProps {
  currentUser: User;
  onNavigateToProfile: (userId: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ currentUser, onNavigateToProfile }) => {
  const [activeMenuPostId, setActiveMenuPostId] = useState<string | null>(null);

  const getUser = (id: string) => MOCK_USERS.find(u => u.id === id) || MOCK_USERS[0];

  const handleMenuAction = (action: string, postId: string) => {
    console.log(`Action: ${action} on Post: ${postId}`);
    setActiveMenuPostId(null);
    // In a real app, implement action logic here
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 md:pb-10 pt-4 px-4 md:px-0" onClick={() => setActiveMenuPostId(null)}>
      
      {/* Stories Section */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-4 mb-6">
        {/* Create Story */}
        <div className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group">
          <div className="relative w-16 h-16 rounded-full p-[2px] border-2 border-dashed border-light-secondary dark:border-dark-secondary">
            <img src={currentUser.avatar} alt="You" className="w-full h-full rounded-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 bg-light-accent dark:bg-dark-accent rounded-full p-1 text-white shadow-sm">
              <Plus size={12} strokeWidth={4} />
            </div>
          </div>
          <span className="text-xs font-medium text-light-text dark:text-dark-text">Your Story</span>
        </div>

        {/* Other Stories */}
        {INITIAL_STORIES.map((story) => {
          const author = getUser(story.authorId);
          return (
            <div key={story.id} className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer transform hover:scale-105 transition-transform">
              <div className={`w-16 h-16 rounded-full p-[2px] ${story.viewed ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gradient-to-tr from-light-accent to-yellow-400 dark:from-dark-accent dark:to-yellow-500'}`}>
                <div className="w-full h-full rounded-full border-2 border-light-bg dark:border-dark-bg overflow-hidden">
                  <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <span 
                onClick={(e) => { e.stopPropagation(); onNavigateToProfile(author.id); }}
                className="text-xs font-medium truncate w-16 text-center text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent hover:underline"
              >
                {author.name.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Posts Section */}
      <div className="flex flex-col gap-6">
        {INITIAL_POSTS.map((post) => {
          const author = getUser(post.authorId);
          return (
            <article key={post.id} className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-sm overflow-visible border border-light-secondary/10 dark:border-dark-secondary/10 relative">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4 relative z-10">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.stopPropagation(); onNavigateToProfile(author.id); }}>
                  <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover group-hover:opacity-80 transition-opacity" />
                  <div>
                    <h3 className="font-bold text-sm text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">{author.name}</h3>
                    <p className="text-xs text-light-text/60 dark:text-dark-text/60">2 hours ago</p>
                  </div>
                </div>
                
                {/* Menu Dropdown Container */}
                <div className="relative">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveMenuPostId(activeMenuPostId === post.id ? null : post.id); }}
                    className={`p-2 rounded-full transition-colors ${activeMenuPostId === post.id ? 'bg-black/5 dark:bg-white/10 text-light-text dark:text-dark-text' : 'text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text'}`}
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenuPostId === post.id && (
                    <div className="absolute right-0 top-10 w-48 bg-white dark:bg-[#2A2A2A] rounded-xl shadow-xl border border-light-secondary/20 dark:border-dark-secondary/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                      <div className="py-1">
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleMenuAction('report', post.id); }}
                            className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                        >
                            <Flag size={16} /> Report
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleMenuAction('unfollow', post.id); }}
                            className="w-full text-left px-4 py-3 text-sm text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-white/5 flex items-center gap-2"
                        >
                            <UserMinus size={16} /> Unfollow
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleMenuAction('copy', post.id); }}
                            className="w-full text-left px-4 py-3 text-sm text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-white/5 flex items-center gap-2"
                        >
                            <LinkIcon size={16} /> Copy Link
                        </button>
                        <div className="h-px bg-light-secondary/10 dark:bg-dark-secondary/10 my-1"></div>
                         <button 
                            onClick={(e) => { e.stopPropagation(); handleMenuAction('hide', post.id); }}
                            className="w-full text-left px-4 py-3 text-sm text-light-text/60 dark:text-dark-text/60 hover:bg-light-bg dark:hover:bg-white/5 flex items-center gap-2"
                        >
                            <Trash2 size={16} /> Hide Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Post Image */}
              {post.imageUrl && (
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 z-0">
                  <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Post Actions */}
              <div className="p-4 z-0 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button className="text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors">
                      <Heart size={24} />
                    </button>
                    <button className="text-light-text dark:text-dark-text hover:text-light-secondary dark:hover:text-dark-secondary transition-colors">
                      <MessageCircle size={24} />
                    </button>
                    <button className="text-light-text dark:text-dark-text hover:text-light-secondary dark:hover:text-dark-secondary transition-colors">
                      <Share2 size={24} />
                    </button>
                  </div>
                </div>

                <div className="font-semibold text-sm mb-2 text-light-text dark:text-dark-text">
                  {post.likes} likes
                </div>
                <div className="mb-2">
                  <span 
                    onClick={() => onNavigateToProfile(author.id)}
                    className="font-bold text-sm mr-2 text-light-text dark:text-dark-text cursor-pointer hover:text-light-accent dark:hover:text-dark-accent hover:underline"
                  >
                    {author.name}
                  </span>
                  <span className="text-sm text-light-text/90 dark:text-dark-text/90">{post.content}</span>
                </div>
                <button className="text-xs text-light-text/50 dark:text-dark-text/50 font-medium">
                  View all {post.comments} comments
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};