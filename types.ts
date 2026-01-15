export interface Tool {
  name: string;
  description: string;
  website: string;
  category: string;
  pricing: string;
}

// Adapting to Supabase user structure partially
export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    [key: string]: any;
  };
}

export enum ViewState {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD'
}
