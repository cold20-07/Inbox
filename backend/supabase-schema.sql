-- Create email_summaries table
CREATE TABLE IF NOT EXISTS email_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  message_id TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_name TEXT,
  subject TEXT NOT NULL,
  received_at TIMESTAMPTZ NOT NULL,
  category TEXT NOT NULL,
  priority_score INTEGER NOT NULL CHECK (priority_score >= 0 AND priority_score <= 100),
  ai_summary TEXT NOT NULL,
  key_points TEXT[] NOT NULL,
  action_items TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_email_summaries_user_id ON email_summaries(user_id);
CREATE INDEX IF NOT EXISTS idx_email_summaries_received_at ON email_summaries(received_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_summaries_category ON email_summaries(category);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE email_summaries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own summaries
CREATE POLICY "Users can view their own summaries" ON email_summaries
  FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Create policy to allow users to insert their own summaries
CREATE POLICY "Users can insert their own summaries" ON email_summaries
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');
