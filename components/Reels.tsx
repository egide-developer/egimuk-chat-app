import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Music } from 'lucide-react';
import { INITIAL_REELS, MOCK_USERS } from '../constants';

interface ReelsProps {
  onNavigateToProfile: (userId: string) => void;
}

export const Reels: React.FC<ReelsProps> = ({ onNavigateToProfile }) => {
  return (
    <div className="w-full h-full md:h-[calc(100vh-40px)] flex flex-col items-center gap-4 overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black md:bg-transparent py-0 md:py-4">
        {INITIAL_REELS.map((reel) => {
            const author = MOCK_USERS.find(u => u.id === reel.authorId) || MOCK_USERS[0];
            return (
                <div key={reel.id} className="relative w-full md:w-[380px] h-screen md:h-[700px] flex-shrink-0 bg-gray-900 md:rounded-2xl overflow-hidden snap-center shadow-2xl">
                    <img src={reel.videoUrl} alt="Reel" className="w-full h-full object-cover opacity-80" />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>

                    {/* Right Actions */}
                    <div className="absolute bottom-20 right-4 flex flex-col items-center gap-6 text-white">
                        <div className="flex flex-col items-center gap-1">
                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:scale-110 transition-transform cursor-pointer">
                                <Heart size={28} fill="white" />
                            </div>
                            <span className="text-xs font-semibold">{reel.likes}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                             <div className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:scale-110 transition-transform cursor-pointer">
                                <MessageCircle size={28} />
                            </div>
                            <span className="text-xs font-semibold">45</span>
                        </div>
                         <div className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:scale-110 transition-transform cursor-pointer">
                            <Share2 size={28} />
                        </div>
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:scale-110 transition-transform cursor-pointer">
                            <MoreHorizontal size={28} />
                        </div>
                        
                        <div 
                            className="mt-4 w-10 h-10 rounded-md border-2 border-white overflow-hidden animate-spin-slow cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => onNavigateToProfile(author.id)}
                        >
                             <img src={author.avatar} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-6 left-4 right-16 text-white">
                        <div className="flex items-center gap-3 mb-3">
                            <img 
                                src={author.avatar} 
                                alt={author.name} 
                                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                                onClick={() => onNavigateToProfile(author.id)}
                            />
                            <span 
                                className="font-bold drop-shadow-md cursor-pointer hover:underline"
                                onClick={() => onNavigateToProfile(author.id)}
                            >
                                {author.name}
                            </span>
                            <button className="px-2 py-0.5 border border-white/50 rounded-md text-xs font-semibold hover:bg-white/20">Follow</button>
                        </div>
                        <p className="mb-4 text-sm drop-shadow-md line-clamp-2">{reel.description}</p>
                        <div className="flex items-center gap-2 text-xs opacity-90">
                            <Music size={14} className="animate-pulse" />
                            <div className="overflow-hidden w-32">
                                <p className="whitespace-nowrap">Original Audio - {author.name} • Original Audio</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  );
};