-- SQL Schema for qualifications table
-- This table stores qualification data before user account creation
-- The ID (auto-increment integer) is used to map to user account later

-- Drop the table if it exists (use with caution in production)
DROP TABLE IF EXISTS qualifications CASCADE;

-- Create the qualifications table
CREATE TABLE qualifications (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  current_revenue VARCHAR(50),
  target_revenue VARCHAR(50),
  timeline VARCHAR(50),
  main_goal TEXT,
  challenges TEXT,
  team_size VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  from_country VARCHAR(100),
  to_country VARCHAR(100),
  primary_focus VARCHAR(100), -- 'accounting', 'tax-registration', 'ai-bookkeeping', 'virtual-office', 'vat-filing', 'cit-filing', 'branch-registration'
  selected_services JSONB,
  order_summary JSONB, -- Stores order summary with services and pricing as JSON
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'linked', 'completed'
  user_id UUID, -- Will be populated after account creation
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for quick lookups
CREATE INDEX IF NOT EXISTS idx_qualifications_email ON qualifications(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_qualifications_status ON qualifications(status);

-- Create index on user_id for linking
CREATE INDEX IF NOT EXISTS idx_qualifications_user_id ON qualifications(user_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_qualifications_created_at ON qualifications(created_at DESC);

