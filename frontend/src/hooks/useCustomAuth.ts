import { useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  createdAt: string
}

const API_URL = 'http://localhost:5000/api/auth'

export function useCustomAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Check for stored token
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      setToken(storedToken)
      // Verify token and get user
      fetchUser(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (authToken: string) => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        // Token invalid, clear it
        localStorage.removeItem('auth_token')
        setToken(null)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      localStorage.removeItem('auth_token')
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed')
    }

    // Store token
    localStorage.setItem('auth_token', data.token)
    setToken(data.token)
    setUser(data.user)

    return data
  }

  const signIn = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Sign in failed')
    }

    // Store token
    localStorage.setItem('auth_token', data.token)
    setToken(data.token)
    setUser(data.user)

    return data
  }

  const signOut = async () => {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
  }

  return { user, loading, token, signUp, signIn, signOut }
}
