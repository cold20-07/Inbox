import { useState } from 'react'
import { X, Zap } from 'lucide-react'

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

const MAX_SUBJECT_LENGTH = 200
const MAX_BODY_LENGTH = 10000

export default function NewEmailForm({ onClose }: NewEmailFormProps) {
  const [sender, setSender] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Input validation
    const trimmedSubject = subject.trim()
    const trimmedBody = body.trim()
    
    if (trimmedSubject.length > MAX_SUBJECT_LENGTH) {
      setError(`Subject must be less than ${MAX_SUBJECT_LENGTH} characters`)
      return
    }
    
    if (trimmedBody.length > MAX_BODY_LENGTH) {
      setError(`Email body must be less than ${MAX_BODY_LENGTH} characters`)
      return
    }
    
    setLoading(true)

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      const apiUrl = import.meta.env.VITE_API_URL || 
        (import.meta.env.PROD ? '' : 'http://localhost:5000')
      const response = await fetch(`${apiUrl}/api/emails/analyze`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          sender: sender.trim(), 
          subject: trimmedSubject, 
          body: trimmedBody 
        })
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.')
        }
        throw new Error(data.error || 'Failed to analyze email')
      }

      setResult(data)
    } catch (error) {
      console.error('Error analyzing email:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze email. Please try again.'
      setError(errorMessage)
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
        {error && (
          <div className="bg-chaos/10 border-4 border-chaos p-4">
            <p className="text-chaos font-display text-lg">{error}</p>
          </div>
        )}
        
        <div>
          <label className="block text-xl font-display mb-3">
            FROM (OPTIONAL)
          </label>
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="sender@example.com"
            maxLength={100}
            className="w-full px-6 py-4 border-4 border-black text-xl font-body focus:outline-none focus:border-hotpink transition-colors"
          />
        </div>

        <div>
          <label className="block text-xl font-display mb-3">
            SUBJECT {subject.length > 0 && `(${subject.length}/${MAX_SUBJECT_LENGTH})`}
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            required
            maxLength={MAX_SUBJECT_LENGTH}
            className="w-full px-6 py-4 border-4 border-black text-xl font-body focus:outline-none focus:border-hotpink transition-colors"
          />
        </div>

        <div>
          <label className="block text-xl font-display mb-3">
            EMAIL BODY {body.length > 0 && `(${body.length}/${MAX_BODY_LENGTH})`}
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Paste the email content here..."
            required
            maxLength={MAX_BODY_LENGTH}
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
