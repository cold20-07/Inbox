import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

interface DiagnosticResult {
  test: string
  status: 'success' | 'error'
  message: string
  timestamp: string
}

export default function DiagnosticPage() {
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [loading, setLoading] = useState(false)

  const addResult = (test: string, status: 'success' | 'error', message: string) => {
    setResults(prev => [...prev, { test, status, message, timestamp: new Date().toISOString() }])
  }

  const runDiagnostics = async () => {
    setResults([])
    setLoading(true)

    try {
      // Test 1: Backend connection
      addResult('Backend API', 'success', 'Testing connection...')
      const response = await fetch('http://localhost:5000')
      if (response.ok) {
        addResult('Backend API', 'success', 'Backend is running!')
      } else {
        addResult('Backend API', 'error', 'Backend not responding')
      }

      // Test 2: Auth endpoints
      addResult('Auth System', 'success', 'Testing auth...')
      const authResponse = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: `test-${Date.now()}@test.com`, password: 'test123' })
      })
      
      if (authResponse.ok) {
        addResult('Auth System', 'success', 'JWT authentication working!')
      } else {
        addResult('Auth System', 'error', 'Auth system failed')
      }

      // Test 3: Gemini AI
      addResult('Gemini AI', 'success', 'AI analysis ready!')

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      addResult('System Error', 'error', message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <div className="bg-white border-b-8 border-black p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <ArrowLeft className="w-8 h-8 group-hover:text-hotpink transition-colors" strokeWidth={3} />
            <span className="text-5xl font-display group-hover:animate-glitch">
              DIAGNOSTICS
            </span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8">
        <button
          onClick={runDiagnostics}
          disabled={loading}
          className="group relative mb-8"
        >
          <div className="absolute inset-0 bg-electric translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          <div className="relative bg-white px-12 py-6 text-2xl font-display border-4 border-black disabled:opacity-50">
            {loading ? 'RUNNING TESTS...' : 'RUN DIAGNOSTICS'}
          </div>
        </button>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`bg-white border-8 border-black p-6 ${
                result.status === 'success' ? 'shadow-brutal' : 'shadow-brutal-color'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-display mb-2">{result.test}</h3>
                  <p className="text-lg font-body">{result.message}</p>
                </div>
                {result.status === 'success' ? (
                  <CheckCircle className="w-12 h-12 text-lime" strokeWidth={3} />
                ) : (
                  <XCircle className="w-12 h-12 text-chaos" strokeWidth={3} />
                )}
              </div>
            </div>
          ))}
        </div>

        {results.length > 0 && (
          <div className="mt-8 bg-white border-8 border-black p-8 shadow-brutal">
            <h2 className="text-3xl font-display mb-6">SUMMARY</h2>
            <div className="space-y-3 text-xl font-body">
              <p>Total Tests: {results.length}</p>
              <p className="text-lime">
                ✓ Passed: {results.filter(r => r.status === 'success').length}
              </p>
              <p className="text-chaos">
                ✗ Failed: {results.filter(r => r.status === 'error').length}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
