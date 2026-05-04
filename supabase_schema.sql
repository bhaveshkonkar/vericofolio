-- Create the waitlist table
CREATE TABLE waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  source text NOT NULL, -- e.g., 'hero', 'recruiters', 'cta', 'footer'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to insert
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Create the suggestions table
CREATE TABLE suggestions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text, -- Optional email if they want to be contacted
  suggestion text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for suggestions
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to insert suggestions
CREATE POLICY "Allow anonymous inserts on suggestions" ON suggestions
  FOR INSERT
  WITH CHECK (true);
