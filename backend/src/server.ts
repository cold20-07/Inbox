import dotenv from 'dotenv'
// Load environment variables FIRST before any other imports
dotenv.config()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createClient } from '@supabase/supabase-js'
import analyzeRoutes from './routes/analyze.routes.js'

const app = express()
const PORT = process.env.PORT || 5000

// Security Headers
app.use(helmet())

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

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

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.json({
    name: 'Inbox Unclutter API',
    version: '2.0.0',
    status: 'running',
    auth: 'None (Public)',
    endpoints: {
      health: '/api/health',
      analyzeEmail: 'POST /api/emails/analyze'
    },
    documentation: 'See README.md for API documentation'
  })
})

// app.use('/api/auth', authRoutes) // Auth disabled
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
