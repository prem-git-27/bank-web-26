/*
  # Finance App Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - User's unique identifier
      - `name` (text) - User's full name
      - `email` (text, unique) - User's email address
      - `role` (text) - User role (user/admin), defaults to 'user'
      - `created_at` (timestamp) - Account creation timestamp
    
    - `transactions`
      - `id` (uuid, primary key) - Transaction unique identifier
      - `user_id` (uuid, foreign key) - References users.id
      - `type` (text) - Transaction type (income/expense)
      - `category` (text) - Transaction category
      - `amount` (decimal) - Transaction amount
      - `date` (date) - Transaction date
      - `created_at` (timestamp) - Record creation timestamp

  2. Security
    - Enable RLS on both tables
    - Users can only access their own data
    - Admin users can access all data
    
  3. Relationships
    - Foreign key constraint between transactions.user_id and users.id
    - Cascade delete for user transactions
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  category text NOT NULL,
  amount decimal(10,2) NOT NULL CHECK (amount > 0),
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all users" ON users
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update all users" ON users
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for transactions table
CREATE POLICY "Users can read own transactions" ON transactions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all transactions" ON transactions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can update all transactions" ON transactions
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can delete all transactions" ON transactions
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);