import dotenv from 'dotenv'
// Load environment variables FIRST before any other imports
dotenv.config()

import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import analyzeRoutes from './routes/analyze.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()
const PORT = process.env.PORT || 5000

// Validate required environment variables
const requiredEnvVars = ['GEMINI_API_KEY']
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '))
  console.error('Please check your .env file')
  process.exit(1)
}

// Initialize Supabase client (optional - only for database features)
export const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  : null

app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.json({ 
    name: 'Inbox Unclutter API',
    version: '2.0.0',
    status: 'running',
    auth: 'JWT-based',
    endpoints: {
      health: '/api/health',
      signup: 'POST /api/auth/signup',
      signin: 'POST /api/auth/signin',
      me: 'GET /api/auth/me',
      analyzeEmail: 'POST /api/emails/analyze'
    },
    documentation: 'See README.md for API documentation'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/emails', analyzeRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Inbox Unclutter API is running' })
})

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err)
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`✨ Ready to summarize emails with Gemini AI`)
})
