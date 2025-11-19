import { Router } from 'express'
import { analyzeEmail } from '../services/gemini.service.js'
import { supabase } from '../server.js'

const router = Router()

router.post('/analyze', async (req, res) => {
  try {
    // Validate request body exists
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is required' })
    }

    const { sender, subject, body } = req.body

    // Validate required fields
    if (!subject || !body) {
      return res.status(400).json({ error: 'Subject and body are required' })
    }

    // Validate types
    if (typeof subject !== 'string' || typeof body !== 'string') {
      return res.status(400).json({ error: 'Subject and body must be strings' })
    }

    if (sender && typeof sender !== 'string') {
      return res.status(400).json({ error: 'Sender must be a string' })
    }

    // Validate lengths
    if (subject.length > 200) {
      return res.status(400).json({ error: 'Subject must be less than 200 characters' })
    }

    if (body.length > 10000) {
      return res.status(400).json({ error: 'Body must be less than 10,000 characters' })
    }

    // Sanitize inputs
    const sanitizedSender = sender ? sender.trim() : 'Unknown'
    const sanitizedSubject = subject.trim()
    const sanitizedBody = body.trim()

    // User ID is always anonymous now
    const userId = 'anonymous'

    // Analyze with Gemini
    const analysis = await analyzeEmail(sanitizedSender, sanitizedSubject, sanitizedBody)

    // Try to save to database (optional - don't fail if it doesn't work)
    if (supabase) {
      try {
        await supabase
          .from('email_summaries')
          .insert({
            user_id: userId,
            message_id: `manual-${Date.now()}`,
            sender_email: sanitizedSender === 'Unknown' ? 'unknown@example.com' : sanitizedSender,
            sender_name: sanitizedSender,
            subject: sanitizedSubject,
            received_at: new Date().toISOString(),
            category: analysis.category,
            priority_score: analysis.priorityScore,
            ai_summary: analysis.summary,
            key_points: analysis.keyPoints,
            action_items: analysis.actionItems
          })

        console.log('✅ Saved to database')
      } catch (dbError) {
        console.log('⚠️ Could not save to database, but analysis succeeded:', dbError)
      }
    } else {
      console.log('⚠️ Supabase not configured, skipping database save')
    }

    // Return the analysis regardless of database save
    res.json({
      subject: sanitizedSubject,
      senderEmail: sanitizedSender === 'Unknown' ? 'unknown@example.com' : sanitizedSender,
      senderName: sanitizedSender,
      category: analysis.category,
      priorityScore: analysis.priorityScore,
      summary: analysis.summary,
      keyPoints: analysis.keyPoints,
      actionItems: analysis.actionItems
    })
  } catch (error) {
    console.error('Analyze error:', error)
    res.status(500).json({
      error: 'Failed to analyze email',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
