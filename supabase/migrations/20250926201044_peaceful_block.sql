/*
  # Seed default categories

  1. Categories
    - Create default income and expense categories
    - Each category has a name, color, icon, and type
  
  2. Security
    - Categories are readable by authenticated users
*/

-- Insert default expense categories
INSERT INTO categories (name, color, icon, type) VALUES
  ('Food & Dining', '#EF4444', 'utensils', 'expense'),
  ('Shopping', '#F59E0B', 'shopping-bag', 'expense'),
  ('Transportation', '#3B82F6', 'car', 'expense'),
  ('Bills & Utilities', '#8B5CF6', 'receipt', 'expense'),
  ('Healthcare', '#10B981', 'heart', 'expense'),
  ('Entertainment', '#F97316', 'film', 'expense'),
  ('Education', '#06B6D4', 'book', 'expense'),
  ('Travel', '#84CC16', 'plane', 'expense'),
  ('Other Expenses', '#6B7280', 'more-horizontal', 'expense');

-- Insert default income categories
INSERT INTO categories (name, color, icon, type) VALUES
  ('Salary', '#10B981', 'briefcase', 'income'),
  ('Freelance', '#3B82F6', 'laptop', 'income'),
  ('Investment', '#8B5CF6', 'trending-up', 'income'),
  ('Gift', '#F59E0B', 'gift', 'income'),
  ('Other Income', '#6B7280', 'plus-circle', 'income');