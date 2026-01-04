import React from 'react';
import { Image, Video, Smile, X } from 'lucide-react';
import { Button } from './Button';

export const CreatePost: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl border border-light-secondary/20 dark:border-dark-secondary/20 p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text">Create Post</h2>
                <button className="text-light-text/50 hover:text-light-text dark:text-dark-text/50 dark:hover:text-dark-text">
                    <X size={24} />
                </button>
            </div>
            
            <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden shrink-0">
                    <img src="https://picsum.photos/200/200?random=1" alt="You" className="w-full h-full object-cover" />
                </div>
                <textarea 
                    className="flex-1 bg-transparent resize-none h-32 outline-none text-light-text dark:text-dark-text placeholder-light-text/40 dark:placeholder-dark-text/40 text-lg"
                    placeholder="What's on your mind, Alex?"
                ></textarea>
            </div>

            <div className="border rounded-xl border-light-secondary/20 dark:border-dark-secondary/20 p-4 mb-6 flex justify-between items-center">
                <span className="text-sm font-medium text-light-text dark:text-dark-text">Add to your post</span>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-green-600"><Image size={24} /></button>
                    <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-blue-600"><Video size={24} /></button>
                    <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-yellow-600"><Smile size={24} /></button>
                </div>
            </div>

            <Button className="w-full">Post</Button>
        </div>
    </div>
  );
};