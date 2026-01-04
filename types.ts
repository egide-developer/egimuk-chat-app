/**
 * Represents a user in the system.
 * Used for authentication context, profile display, and chat participants.
 */
export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  isOnline?: boolean;
}

/**
 * Supported media types for chat messages.
 */
export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio'
}

/**
 * Represents a single message within a chat session.
 * Contains sender info, content, type, and timestamp.
 */
export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: MessageType;
  timestamp: number;
  read?: boolean;
  mediaUrl?: string;
}

/**
 * Represents a conversation thread (Direct Message or Group).
 * Holds the list of messages and participants.
 */
export interface ChatSession {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  isGroup?: boolean;
  name?: string; // For groups
}

/**
 * Represents a social feed post.
 * Includes engagement metrics like likes and comments.
 */
export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  timestamp: number;
  likedByCurrentUser?: boolean;
}

/**
 * Represents a short-form video content (Reel).
 * MODELED after TikTok/Instagram Reels.
 */
export interface Reel {
  id: string;
  authorId: string;
  videoUrl: string; // Using placeholder images for demo
  description: string;
  likes: number;
}

/**
 * Represents a temporary status update (Story).
 */
export interface Story {
  id: string;
  authorId: string;
  imageUrl: string;
  timestamp: number;
  viewed: boolean;
}

/**
 * Union type for the main application views/routes.
 * Controlled by the Sidebar and App state.
 */
export type ViewState = 'feed' | 'chat' | 'reels' | 'profile' | 'settings' | 'create';

/**
 * Global application state interface.
 */
export interface AppState {
  currentUser: User;
  theme: 'light' | 'dark';
}
