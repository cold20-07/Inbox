import { Router } from 'express'
import { analyzeEmail } from '../services/gemini.service.js'
import { supabase } from '../server.js'

const router = Router()

router.post('/analyze', async (req, res) => {
  try {
    const { sender, subject, body } = req.body


    if (!subject || !body) {
      return res.status(400).json({ error: 'Subject and body are required' })
    }

    // User ID is always anonymous now
    const userId = 'anonymous'

    // Analyze with Gemini
    const analysis = await analyzeEmail(sender || 'Unknown', subject, body)

    // Try to save to database (optional - don't fail if it doesn't work)
    if (supabase) {
      try {
        await supabase
          .from('email_summaries')
          .insert({
            user_id: userId,
            message_id: `manual-${Date.now()}`,
            sender_email: sender || 'unknown@example.com',
            sender_name: sender,
            subject,
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
      subject,
      senderEmail: sender || 'unknown@example.com',
      senderName: sender,
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
