import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useCustomAuth } from '../hooks/useCustomAuth'
import { useState } from 'react'

export default function Settings() {
  const { user } = useCustomAuth()
  const [digestFrequency, setDigestFrequency] = useState('daily')
  const [summaryStyle, setSummaryStyle] = useState('concise')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      alert('Settings saved!')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <div className="bg-white border-b-8 border-black p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-4 group">
            <ArrowLeft className="w-8 h-8 group-hover:text-hotpink transition-colors" strokeWidth={3} />
            <span className="text-5xl font-display group-hover:animate-glitch">
              SETTINGS
            </span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8">
        <div className="space-y-8">
          {/* Account Info */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <h2 className="text-4xl font-display mb-6">ACCOUNT</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xl font-display mb-2">EMAIL</label>
                <div className="px-6 py-4 bg-lime border-4 border-black text-xl font-body">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <h2 className="text-4xl font-display mb-6">PREFERENCES</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xl font-display mb-3">
                  DIGEST FREQUENCY
                </label>
                <select 
                  value={digestFrequency}
                  onChange={(e) => setDigestFrequency(e.target.value)}
                  className="w-full px-6 py-4 border-4 border-black text-xl font-body focus:outline-none focus:border-hotpink transition-colors"
                >
                  <option value="daily">Daily at 9:00 AM</option>
                  <option value="twice">Twice daily</option>
                  <option value="realtime">Real-time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xl font-display mb-3">
                  SUMMARY STYLE
                </label>
                <select 
                  value={summaryStyle}
                  onChange={(e) => setSummaryStyle(e.target.value)}
                  className="w-full px-6 py-4 border-4 border-black text-xl font-body focus:outline-none focus:border-hotpink transition-colors"
                >
                  <option value="concise">Concise</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>
              
              <button 
                onClick={handleSave}
                disabled={saving}
                className="group relative w-full"
              >
                <div className="absolute inset-0 bg-electric translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                <div className="relative bg-black text-white px-8 py-6 text-2xl font-display border-4 border-black disabled:opacity-50">
                  {saving ? 'SAVING...' : 'SAVE CHANGES'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
