import { Plus, Settings as SettingsIcon, Zap } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import NewEmailForm from '../components/NewEmailForm'

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showNewEmail, setShowNewEmail] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Check if we should auto-open the form
      if (searchParams.get('action') === 'analyze') {
        setShowNewEmail(true)
        // Remove the query parameter
        setSearchParams({})
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchParams, setSearchParams])

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <div className="bg-white border-b-8 border-black p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="text-5xl font-display hover:animate-glitch">
            INBOX
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/settings">
              <button className="group relative">
                <div className="absolute inset-0 bg-electric translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                <div className="relative bg-white px-6 py-3 border-4 border-black font-display text-xl flex items-center gap-2">
                  <SettingsIcon className="w-5 h-5" />
                  SETTINGS
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-12">
          <h1 className="text-8xl font-display text-white mb-4">
            EMAIL
            <br />
            SUMMARIES
          </h1>
          <p className="text-2xl text-white/60 font-body">
            Paste any email. Get AI-powered analysis. Instantly.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block mb-8 animate-pulse">
              <Zap className="w-32 h-32 text-lime" strokeWidth={3} />
            </div>
            <p className="text-3xl font-display text-white">LOADING...</p>
          </div>
        ) : showNewEmail ? (
          <NewEmailForm onClose={() => setShowNewEmail(false)} />
        ) : (
          <div className="text-center py-20">
            <div className="inline-block mb-8">
              <Zap className="w-32 h-32 text-lime" strokeWidth={3} />
            </div>
            <p className="text-3xl font-display text-white mb-8">
              NO EMAILS YET
            </p>
            <button
              onClick={() => setShowNewEmail(true)}
              className="group relative"
            >
              <div className="absolute inset-0 bg-hotpink translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              <div className="relative bg-white px-12 py-6 text-3xl font-display border-4 border-black flex items-center gap-3">
                <Plus className="w-8 h-8" strokeWidth={3} />
                ANALYZE EMAIL
              </div>
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
