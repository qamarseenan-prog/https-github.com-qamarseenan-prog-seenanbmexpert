export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum PageView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  HELP = 'HELP'
}