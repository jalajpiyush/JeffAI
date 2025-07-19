export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  followers: number;
  following: number;
  verified?: boolean;
}

export interface Post {
  id: string;
  user: User;
  content?: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  type: 'text' | 'image' | 'video' | 'reel';
}

export interface Story {
  id: string;
  user: User;
  image: string;
  timestamp: Date;
  viewed: boolean;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
}
