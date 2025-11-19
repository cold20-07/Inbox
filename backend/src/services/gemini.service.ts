import { GoogleGenerativeAI } from '@google/generative-ai'

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY?.trim()

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables')
  }

  const genAI = new GoogleGenerativeAI(apiKey)

  // Use Gemini 2.5 Flash - fast and efficient for email analysis
  return genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1024,
    }
  })
}

export interface EmailAnalysis {
  category: string
  priorityScore: number
  summary: string
  keyPoints: string[]
  actionItems?: string[]
}

// Validation function
function isValidEmailAnalysis(obj: unknown): obj is EmailAnalysis {
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  const record = obj as Record<string, unknown>

  return (
    typeof record.category === 'string' &&
    typeof record.priorityScore === 'number' &&
    record.priorityScore >= 0 &&
    record.priorityScore <= 100 &&
    typeof record.summary === 'string' &&
    Array.isArray(record.keyPoints) &&
    record.keyPoints.length > 0 &&
    (record.actionItems === undefined || Array.isArray(record.actionItems))
  )
}

// Extract JSON from potentially markdown-wrapped response
function extractJSON(text: string): unknown {
  // Remove markdown code blocks if present
  const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  // Try to find JSON object
  const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('No JSON object found in response')
  }

  return JSON.parse(jsonMatch[0])
}

export async function analyzeEmail(
  sender: string,
  subject: string,
  body: string
): Promise<EmailAnalysis> {
  // Improved prompt with explicit JSON structure
  const prompt = `Analyze this email and respond ONLY with a valid JSON object (no markdown, no extra text):

From: ${sender}
Subject: ${subject}
Body: ${body.substring(0, 2000)}

Return a JSON object with this exact structure:
{
  "category": "one of: promotion, receipt, update, meeting, social, personal, important, other",
  "priorityScore": number between 0-100,
  "summary": "1-2 sentence summary",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "actionItems": ["action 1", "action 2"] (optional, empty array if none)
}

Respond with ONLY the JSON object, nothing else.`

  try {
    console.log('🤖 Calling Gemini API...')
    console.log('📧 Analyzing email from:', sender)

    const model = getModel()
    const result = await model.generateContent(prompt)
    const response = result.response

    // Check if response is blocked
    if (!response || response.candidates?.[0]?.finishReason === 'SAFETY') {
      throw new Error('Response blocked by safety filters')
    }

    const text = response.text()
    console.log('✅ Gemini API response received')
    console.log('📝 Response preview:', text.substring(0, 200))

    // Parse and validate JSON
    const parsed = extractJSON(text)

    if (!isValidEmailAnalysis(parsed)) {
      console.warn('⚠️ Invalid response structure, using fallback')
      throw new Error('Invalid response structure')
    }

    console.log('✅ Successfully parsed and validated AI response')
    return parsed

  } catch (error) {
    console.error('❌ Gemini API error:', error)

    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }

    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        console.error('🔑 API Key issue - check your GEMINI_API_KEY')
      } else if (error.message.includes('quota')) {
        console.error('📊 Quota exceeded - check your Gemini API usage')
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        console.error('🌐 Network error - check your internet connection')
      }
    }

    // Return fallback response
    return {
      category: 'other',
      priorityScore: 50,
      summary: `Email from ${sender}: ${subject}`,
      keyPoints: ['Email analysis unavailable due to API error', 'Please check logs for details'],
      actionItems: []
    }
  }
}

interface EmailForDigest {
  sender_name?: string
  sender_email: string
  subject: string
  category: string
}

export async function generateDigest(emails: EmailForDigest[]): Promise<string> {
  if (emails.length === 0) {
    return 'No emails to summarize today.'
  }

  const emailSummaries = emails
    .slice(0, 50) // Limit to prevent token overflow
    .map(e =>
      `- ${e.sender_name || e.sender_email}: ${e.subject} (${e.category})`
    )
    .join('\n')

  const prompt = `Create a friendly daily email digest summary for these ${emails.length} emails:

${emailSummaries}

Generate a concise overview (2-3 sentences) highlighting the most important items and overall themes.
Respond with plain text, no markdown or formatting.`

  try {
    console.log('🤖 Generating digest for', emails.length, 'emails')

    const model = getModel()
    const result = await model.generateContent(prompt)
    const response = result.response

    if (!response || response.candidates?.[0]?.finishReason === 'SAFETY') {
      throw new Error('Response blocked by safety filters')
    }

    const text = response.text()
    console.log('✅ Digest generated successfully')
    return text

  } catch (error) {
    console.error('❌ Gemini API error in digest generation:', error)

    if (error instanceof Error) {
      console.error('Error message:', error.message)
    }

    // Fallback digest
    const categoryCount = emails.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const categorySummary = Object.entries(categoryCount)
      .map(([cat, count]) => `${count} ${cat}`)
      .join(', ')

    return `You received ${emails.length} emails today: ${categorySummary}. Check your dashboard for details.`
  }
}

// Optional: Test function to verify API connectivity
export async function testGeminiConnection(): Promise<boolean> {
  try {
    const model = getModel()
    const result = await model.generateContent('Say "OK" if you can read this.')
    const response = result.response
    const text = response.text()
    console.log('✅ Gemini API connection successful:', text)
    return true
  } catch (error) {
    console.error('❌ Gemini API connection failed:', error)
    return false
  }
}