import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types - Updated to match actual schema
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  category_id: string;
  account_id?: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionWithUser extends Transaction {
  users: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
  created_at: string;
}

export interface Account {
  id: string;
  user_id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}