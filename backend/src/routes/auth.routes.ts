import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/User.js'
import { generateToken } from '../middleware/auth.js'

const router = Router()

if (!process.env.JWT_SECRET) {
  console.warn('⚠️ WARNING: JWT_SECRET not set in environment variables. Using default (insecure for production).')
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    // Check if user exists
    const existingUser = UserModel.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = UserModel.create({
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    })

    // Generate token
    const token = generateToken(user.id)

    console.log('✅ User created:', user.email)

    res.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Find user
    const user = UserModel.findByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Generate token
    const token = generateToken(user.id)

    console.log('✅ User signed in:', user.email)

    res.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    })
  } catch (error) {
    console.error('Signin error:', error)
    res.status(500).json({ error: 'Failed to sign in' })
  }
})

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const user = UserModel.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Token verification error:', error)
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router
