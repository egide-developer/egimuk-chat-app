import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, Image as ImageIcon, Mic, Paperclip, Plus, ArrowLeft, MessageSquare, Smile, Reply, Trash2, Copy, Forward } from 'lucide-react';
import { User, ChatSession, Message, MessageType } from '../types';
import { INITIAL_CHATS, MOCK_USERS } from '../constants';
import { generateAIResponse } from '../services/geminiService';

interface ChatProps {
  currentUser: User;
  onNavigateToProfile: (userId: string) => void;
}

/**
 * Chat Component
 * Responsive Layout:
 * - Desktop: Split view (Chat List | Active Chat)
 * - Mobile: Single view (Chat List -> Active Chat) with navigation
 */
export const Chat: React.FC<ChatProps> = ({ currentUser, onNavigateToProfile }) => {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_CHATS);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // State for message options dropdown
  const [activeMessageMenuId, setActiveMessageMenuId] = useState<string | null>(null);
  
  // Derived state
  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeSessionId) {
      scrollToBottom();
    }
  }, [activeSession?.messages, activeSessionId]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeSessionId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content: inputText,
      type: MessageType.TEXT,
      timestamp: Date.now(),
    };

    const updatedSessions = sessions.map(session => {
      if (session.id === activeSessionId) {
        return {
          ...session,
          messages: [...session.messages, newMessage],
          lastMessage: newMessage,
        };
      }
      return session;
    });

    setSessions(updatedSessions);
    setInputText('');
    
    // AI Logic
    const session = updatedSessions.find(s => s.id === activeSessionId);
    const isAIChat = session?.participants.some(p => p.id === 'u3');

    if (isAIChat) {
      setIsTyping(true);
      const history = session!.messages.map(m => `${m.senderId === 'u3' ? 'AI' : 'User'}: ${m.content}`);
      
      try {
        const aiResponseText = await generateAIResponse(history.slice(-5), newMessage.content);
        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            senderId: 'u3',
            content: aiResponseText,
            type: MessageType.TEXT,
            timestamp: Date.now(),
        };

        setSessions(prev => prev.map(s => {
            if (s.id === activeSessionId) {
                return {
                    ...s,
                    messages: [...s.messages, aiMessage],
                    lastMessage: aiMessage
                };
            }
            return s;
        }));

      } catch (err) {
          console.error(err);
      } finally {
          setIsTyping(false);
      }
    }
  };

  const handleMessageAction = (action: string, msg: Message) => {
    console.log(`Action: ${action} on message ${msg.id}`);
    setActiveMessageMenuId(null);
    
    if (action === 'copy') {
      navigator.clipboard.writeText(msg.content);
    }
    // Implement delete/reply logic here
  };

  const otherParticipant = activeSession?.participants.find(p => p.id !== currentUser.id);

  return (
    <div className="flex h-[calc(100vh-60px)] md:h-screen overflow-hidden bg-light-bg dark:bg-dark-bg">
      
      {/* 
         LEFT PANEL: Chat List 
         - Mobile: Hidden if a session is active
         - Desktop: Always visible (width fixed)
      */}
      <div className={`
        w-full md:w-80 lg:w-96 flex-col border-r border-light-secondary/20 dark:border-dark-secondary/20 bg-light-bg dark:bg-dark-bg
        ${activeSessionId ? 'hidden md:flex' : 'flex'}
      `}>
        <div className="p-4 md:p-6 border-b border-light-secondary/10 dark:border-dark-secondary/10">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">Messages</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
          {sessions.map(session => {
            const participant = session.participants.find(p => p.id !== currentUser.id) || session.participants[0];
            const isActive = session.id === activeSessionId;
            
            return (
              <button
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all w-full text-left group mb-2
                  ${isActive 
                    ? 'bg-light-surface dark:bg-dark-surface shadow-sm' 
                    : 'hover:bg-light-surface/50 dark:hover:bg-dark-surface/50'
                  }`}
              >
                <div 
                  className="relative cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); onNavigateToProfile(participant.id); }}
                >
                  <img src={participant.avatar} alt={participant.name} className="w-12 h-12 rounded-full object-cover" />
                  {participant.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-light-bg dark:border-dark-bg rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`font-semibold ${isActive ? 'text-light-accent dark:text-dark-accent' : 'text-light-text dark:text-dark-text'}`}>
                        {participant.name}
                    </h3>
                    <span className="text-xs text-light-text/50 dark:text-dark-text/50">
                        {new Date(session.lastMessage?.timestamp || 0).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-sm text-light-text/70 dark:text-dark-text/70 truncate">
                    {session.lastMessage?.senderId === currentUser.id ? 'You: ' : ''}{session.lastMessage?.content}
                  </p>
                </div>
              </button>
            );
          })}
          
          <div className="mt-4 text-center px-4">
             <p className="text-sm text-light-text/50 dark:text-dark-text/50">Start a conversation with Gemini AI to test real-time features.</p>
          </div>
        </div>
      </div>

      {/* 
         RIGHT PANEL: Active Chat 
         - Mobile: Hidden if no session is active
         - Desktop: Always visible (Show placeholder if no session)
      */}
      <div className={`
        flex-1 flex flex-col bg-light-surface/30 dark:bg-dark-surface/30 relative
        ${!activeSessionId ? 'hidden md:flex' : 'flex'}
      `}>
        {activeSessionId && otherParticipant ? (
          <>
            {/* Active Chat Header */}
            <div className="flex items-center justify-between p-4 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md border-b border-light-secondary/20 dark:border-dark-secondary/20 sticky top-0 z-10">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => onNavigateToProfile(otherParticipant.id)}
              >
                {/* Back Button (Mobile Only) */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveSessionId(null); }} 
                  className="md:hidden p-1 mr-1 text-light-text dark:text-dark-text hover:bg-black/5 dark:hover:bg-white/10 rounded-full"
                >
                  <ArrowLeft size={24} />
                </button>
                
                <img src={otherParticipant.avatar} alt={otherParticipant.name} className="w-10 h-10 rounded-full object-cover group-hover:opacity-80 transition-opacity" />
                <div>
                  <h3 className="font-bold text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">{otherParticipant.name}</h3>
                  <span className="text-xs text-green-500 font-medium">{otherParticipant.isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-4 text-light-accent dark:text-dark-accent">
                <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"><Phone size={20} /></button>
                <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"><Video size={20} /></button>
                <button className="p-2 text-light-text dark:text-dark-text hover:bg-black/5 dark:hover:bg-white/5 rounded-full"><MoreVertical size={20} /></button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
                className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar"
                onClick={() => setActiveMessageMenuId(null)}
            >
              {activeSession?.messages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                const isMenuOpen = activeMessageMenuId === msg.id;

                return (
                  <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {/* Message Row Wrapper */}
                    <div className={`flex items-center gap-2 group max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                        
                        {/* Message Bubble */}
                        <div 
                            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm relative ${
                            isMe 
                                ? 'bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg rounded-br-none' 
                                : 'bg-white dark:bg-dark-surface text-light-text dark:text-dark-text rounded-bl-none border border-light-secondary/10 dark:border-dark-secondary/10'
                            }`}
                        >
                            {msg.content}
                            <div className={`text-[10px] mt-1 text-right opacity-70`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                        </div>

                        {/* Actions Overlay (Shows on Hover) */}
                        <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity px-1 ${isMenuOpen ? 'opacity-100' : ''}`}>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleMessageAction('react', msg)}} 
                                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-light-text/60 dark:text-dark-text/60 hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                                title="React"
                            >
                                <Smile size={16} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleMessageAction('reply', msg)}} 
                                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-light-text/60 dark:text-dark-text/60 hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                                title="Reply"
                            >
                                <Reply size={16} />
                            </button>
                            
                            {/* More Options Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setActiveMessageMenuId(isMenuOpen ? null : msg.id); }}
                                    className={`p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-light-text/60 dark:text-dark-text/60 hover:text-light-accent dark:hover:text-dark-accent transition-colors ${isMenuOpen ? 'bg-black/5 dark:bg-white/10 text-light-accent dark:text-dark-accent' : ''}`}
                                >
                                    <MoreVertical size={16} />
                                </button>
                                
                                {isMenuOpen && (
                                    <div className={`absolute bottom-full mb-2 ${isMe ? 'right-0' : 'left-0'} bg-white dark:bg-dark-surface shadow-xl rounded-xl border border-light-secondary/20 dark:border-dark-secondary/20 z-50 py-1 min-w-[140px] animate-in fade-in zoom-in-95 duration-100`}>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleMessageAction('reply', msg)}} 
                                            className="w-full text-left px-4 py-2.5 text-sm text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-white/5 flex items-center gap-2 transition-colors"
                                        >
                                            <Reply size={14} /> Reply
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleMessageAction('copy', msg)}} 
                                            className="w-full text-left px-4 py-2.5 text-sm text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-white/5 flex items-center gap-2 transition-colors"
                                        >
                                            <Copy size={14} /> Copy
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleMessageAction('forward', msg)}} 
                                            className="w-full text-left px-4 py-2.5 text-sm text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-white/5 flex items-center gap-2 transition-colors"
                                        >
                                            <Forward size={14} /> Forward
                                        </button>
                                        <div className="h-px bg-light-secondary/10 dark:bg-dark-secondary/10 my-1"></div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleMessageAction('delete', msg)}} 
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2 transition-colors"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                  </div>
                );
              })}
              
              {isTyping && (
                  <div className="flex justify-start w-full">
                      <div className="bg-white dark:bg-dark-surface px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                      </div>
                  </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-md">
              <div className="flex items-center gap-2 bg-white dark:bg-[#2A2A2A] p-2 pr-2 rounded-full shadow-inner border border-light-secondary/20 dark:border-dark-secondary/20">
                  <button className="p-2 text-light-text/50 dark:text-dark-text/50 hover:text-light-accent dark:hover:text-dark-accent rounded-full transition-colors">
                      <Plus size={20} />
                  </button>
                  <input 
                      type="text" 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent border-none focus:ring-0 text-light-text dark:text-dark-text placeholder-light-text/40 dark:placeholder-dark-text/40 text-sm"
                  />
                  {!inputText && (
                      <>
                      <button className="p-2 text-light-text/50 dark:text-dark-text/50 hover:text-light-text dark:hover:text-dark-text hidden sm:block">
                          <ImageIcon size={20} />
                      </button>
                      <button className="p-2 text-light-text/50 dark:text-dark-text/50 hover:text-light-text dark:hover:text-dark-text hidden sm:block">
                          <Mic size={20} />
                      </button>
                      </>
                  )}
                  {inputText && (
                      <button 
                          onClick={handleSendMessage}
                          className="p-2 bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg rounded-full hover:scale-105 transition-transform"
                      >
                          <Send size={18} fill="currentColor" />
                      </button>
                  )}
              </div>
            </div>
          </>
        ) : (
          /* Desktop Placeholder when no chat is selected */
          <div className="hidden md:flex flex-col items-center justify-center h-full text-light-text/30 dark:text-dark-text/30 gap-4">
             <div className="w-24 h-24 rounded-full bg-light-surface dark:bg-dark-surface flex items-center justify-center">
                <MessageSquare size={48} strokeWidth={1.5} />
             </div>
             <p className="text-lg font-medium">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};