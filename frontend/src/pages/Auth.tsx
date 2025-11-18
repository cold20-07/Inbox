import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useCustomAuth } from '../hooks/useCustomAuth'
import { useEffect, useState } from 'react'

export default function Auth() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signUp, signIn } = useCustomAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const isSignUp = location.pathname === '/signup'

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
      navigate('/dashboard')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Chaotic background shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-40 w-96 h-96 bg-hotpink rotate-12" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-electric rotate-45" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-lime -rotate-12" />
      </div>

      {/* Back to Home */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 z-20 text-white text-xl font-display hover:text-hotpink transition-colors"
      >
        ← BACK
      </Link>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-xl">
          {/* Logo */}
          <Link to="/" className="block text-center mb-12">
            <h1 className="text-8xl font-display text-white mb-4 hover:animate-glitch">
              INBOX
            </h1>
          </Link>

          {/* Auth Box */}
          <div className="bg-white border-8 border-black p-12 shadow-brutal-color">
            <h2 className="text-5xl font-display mb-8 text-black">
              {isSignUp ? 'SIGN UP' : 'SIGN IN'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-xl font-display mb-3 text-black">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-6 py-4 border-4 border-black text-xl font-body focus:outline-none focus:border-hotpink transition-colors"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xl font-display mb-3 text-black">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full px-6 py-4 border-4 border-black text-xl font-body focus:outline-none focus:border-hotpink transition-colors"
                />
                {isSignUp && (
                  <p className="text-sm text-gray-600 mt-2 font-body">Min 6 characters</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-chaos text-white border-4 border-black">
                  <p className="font-display text-lg">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full group relative"
              >
                <div className="absolute inset-0 bg-hotpink translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                <div className="relative bg-black text-white px-8 py-6 text-2xl font-display border-4 border-black transition-transform group-hover:scale-[1.02] disabled:opacity-50">
                  {loading ? 'LOADING...' : (isSignUp ? 'CREATE ACCOUNT →' : 'SIGN IN →')}
                </div>
              </button>
            </form>

            {/* Toggle Link */}
            <div className="mt-8 pt-8 border-t-4 border-black">
              <p className="text-center text-lg font-body mb-4">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </p>
              <Link 
                to={isSignUp ? '/login' : '/signup'}
                className="block text-center py-4 border-4 border-black font-display text-xl hover:bg-lime hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                {isSignUp ? 'SIGN IN' : 'SIGN UP'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
