import { useState } from 'react'
import { X, Zap } from 'lucide-react'
// import { useCustomAuth } from '../hooks/useCustomAuth'

interface NewEmailFormProps {
  onClose: () => void
}

interface AnalysisResult {
  subject: string
  senderName?: string
  senderEmail: string
  category: string
  priorityScore: number
  summary: string
  keyPoints?: string[]
  actionItems?: string[]
}

export default function NewEmailForm({ onClose }: NewEmailFormProps) {
  // const { token } = useCustomAuth()
  const [sender, setSender] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      // if (token) {
      //   headers['Authorization'] = `Bearer ${token}`
      // }

      // Use relative URL in production (same domain), absolute in development
      const apiUrl = import.meta.env.VITE_API_URL || 
        (import.meta.env.PROD ? '' : 'http://localhost:5000')
      const response = await fetch(`${apiUrl}/api/emails/analyze`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ sender, subject, body })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      setResult(data)
    } catch (error) {
      console.error('Error analyzing email:', error)
      alert('Failed to analyze email')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="bg-white border-8 border-black p-8 shadow-brutal-color">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <h3 className="text-4xl font-display mb-2">{result.subject}</h3>
            <p className="text-xl font-body text-gray-600">From: {result.senderName || result.senderEmail}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-chaos hover:text-white border-4 border-black transition-colors"
          >
            <X className="w-8 h-8" strokeWidth={3} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="px-6 py-3 bg-lime border-4 border-black font-display text-xl">
              {result.category}
            </div>
            <div className="px-6 py-3 bg-electric text-white border-4 border-black font-display text-xl">
              PRIORITY: {result.priorityScore}/100
            </div>
          </div>

          <div className="border-4 border-black p-6 bg-gray-50">
            <h4 className="text-2xl font-display mb-4">SUMMARY</h4>
            <p className="text-lg font-body">{result.summary}</p>
          </div>

          {result.keyPoints && result.keyPoints.length > 0 && (
            <div className="border-4 border-black p-6 bg-gray-50">
              <h4 className="text-2xl font-display mb-4">KEY POINTS</h4>
              <ul className="space-y-2">
                {result.keyPoints.map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-hotpink text-2xl">▸</span>
                    <span className="text-lg font-body">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.actionItems && result.actionItems.length > 0 && (
            <div className="border-4 border-black p-6 bg-gray-50">
              <h4 className="text-2xl font-display mb-4">ACTION ITEMS</h4>
              <ul className="space-y-2">
                {result.actionItems.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-electric text-2xl">▸</span>
                    <span className="text-lg font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => {
              setResult(null)
              setSender('')
              setSubject('')
              setBody('')
            }}
            className="group relative w-full"
          >
            <div className="absolute inset-0 bg-lime translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            <div className="relative bg-white px-8 py-4 text-2xl font-display border-4 border-black">
              ANALYZE ANOTHER →
            </div>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-8 border-black p-8 shadow-brutal-color">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-4xl font-display">PASTE EMAIL</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-chaos hover:text-white border-4 border-black transition-colors"
        >
          <X className="w-8 h-8" strokeWidth={3} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xl font-display mb-3">
            FROM (OPTIONAL)
          </label>
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="sender@example.com"
            className="w-full px-6 py-4 border-4 border-black text-xl font-body focus:outline-none focus:border-hotpink transition-colors"
          />
        </div>

        <div>
          <label className="block text-xl font-display mb-3">
            SUBJECT
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            required
            className="w-full px-6 py-4 border-4 border-black text-xl font-body focus:outline-none focus:border-hotpink transition-colors"
          />
        </div>

        <div>
          <label className="block text-xl font-display mb-3">
            EMAIL BODY
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Paste the email content here..."
            required
            rows={12}
            className="w-full px-6 py-4 border-4 border-black text-xl font-body focus:outline-none focus:border-hotpink transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full"
        >
          <div className="absolute inset-0 bg-hotpink translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          <div className="relative bg-black text-white px-8 py-6 text-2xl font-display border-4 border-black flex items-center justify-center gap-3 disabled:opacity-50">
            {loading ? (
              <>
                <Zap className="w-6 h-6 animate-pulse" strokeWidth={3} />
                ANALYZING...
              </>
            ) : (
              <>
                <Zap className="w-6 h-6" strokeWidth={3} />
                ANALYZE EMAIL
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  )
}
