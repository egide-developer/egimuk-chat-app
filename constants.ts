import { User, Post, ChatSession, MessageType, Reel, Story } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  avatar: 'https://picsum.photos/200/200?random=1',
  bio: 'Digital explorer & UI enthusiast.',
  isOnline: true,
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  { id: 'u2', name: 'Sarah Chen', avatar: 'https://picsum.photos/200/200?random=2', isOnline: true },
  { id: 'u3', name: 'Gemini AI', avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', bio: 'AI Assistant', isOnline: true },
  { id: 'u4', name: 'Marcus Johnson', avatar: 'https://picsum.photos/200/200?random=4', isOnline: false },
  { id: 'u5', name: 'Elena Rodriguez', avatar: 'https://picsum.photos/200/200?random=5', isOnline: true },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    authorId: 'u2',
    content: 'Just arrived in Tokyo! The neon lights are mesmerizing. 🌃 #travel #japan',
    imageUrl: 'https://picsum.photos/800/600?random=10',
    likes: 124,
    comments: 18,
    timestamp: Date.now() - 3600000,
  },
  {
    id: 'p2',
    authorId: 'u4',
    content: 'Working on a new painting. Layers upon layers. 🎨',
    imageUrl: 'https://picsum.photos/800/600?random=11',
    likes: 89,
    comments: 5,
    timestamp: Date.now() - 7200000,
  },
  {
    id: 'p3',
    authorId: 'u5',
    content: 'Coffee first, everything else later. ☕️',
    likes: 45,
    comments: 2,
    timestamp: Date.now() - 10800000,
  },
];

export const INITIAL_STORIES: Story[] = [
  { id: 's1', authorId: 'u2', imageUrl: 'https://picsum.photos/400/800?random=20', timestamp: Date.now(), viewed: false },
  { id: 's2', authorId: 'u4', imageUrl: 'https://picsum.photos/400/800?random=21', timestamp: Date.now(), viewed: false },
  { id: 's3', authorId: 'u5', imageUrl: 'https://picsum.photos/400/800?random=22', timestamp: Date.now(), viewed: true },
];

export const INITIAL_REELS: Reel[] = [
  { id: 'r1', authorId: 'u2', videoUrl: 'https://picsum.photos/400/700?random=30', description: 'Sunset vibes 🌅', likes: 1200 },
  { id: 'r2', authorId: 'u4', videoUrl: 'https://picsum.photos/400/700?random=31', description: 'Art process timelapse 🖌️', likes: 850 },
];

export const INITIAL_CHATS: ChatSession[] = [
  {
    id: 'c1',
    participants: [CURRENT_USER, MOCK_USERS[2]], // Chat with Gemini
    messages: [
      { id: 'm1', senderId: 'u3', content: 'Hello Alex! How can I help you today?', type: MessageType.TEXT, timestamp: Date.now() - 10000 },
    ],
    lastMessage: { id: 'm1', senderId: 'u3', content: 'Hello Alex! How can I help you today?', type: MessageType.TEXT, timestamp: Date.now() - 10000 },
  },
  {
    id: 'c2',
    participants: [CURRENT_USER, MOCK_USERS[1]],
    messages: [
      { id: 'm2', senderId: 'u2', content: 'Are we still on for lunch?', type: MessageType.TEXT, timestamp: Date.now() - 3600000 },
    ],
    lastMessage: { id: 'm2', senderId: 'u2', content: 'Are we still on for lunch?', type: MessageType.TEXT, timestamp: Date.now() - 3600000 },
  }
];
