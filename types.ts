export interface Tool {
  name: string;
  description: string;
  website: string;
  category: string;
  pricing: string;
}

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    [key: string]: any;
  };
}