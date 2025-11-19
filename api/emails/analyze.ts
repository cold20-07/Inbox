import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1024,
    }
  });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sender, subject, body } = req.body;

    if (!subject || !body) {
      return res.status(400).json({ error: 'Subject and body are required' });
    }

    const prompt = `Analyze this email and respond ONLY with a valid JSON object (no markdown, no extra text):

From: ${sender || 'Unknown'}
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

Respond with ONLY the JSON object, nothing else.`;

    const model = getModel();
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    if (!response || response.candidates?.[0]?.finishReason === 'SAFETY') {
      throw new Error('Response blocked by safety filters');
    }
    
    const text = response.text();
    
    // Extract JSON from response
    const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);

    return res.json({
      subject,
      senderEmail: sender || 'unknown@example.com',
      senderName: sender,
      category: analysis.category,
      priorityScore: analysis.priorityScore,
      summary: analysis.summary,
      keyPoints: analysis.keyPoints,
      actionItems: analysis.actionItems || []
    });
  } catch (error) {
    console.error('Analyze error:', error);
    
    // Return fallback response
    return res.json({
      subject: req.body.subject,
      senderEmail: req.body.sender || 'unknown@example.com',
      senderName: req.body.sender,
      category: 'other',
      priorityScore: 50,
      summary: `Email from ${req.body.sender || 'Unknown'}: ${req.body.subject}`,
      keyPoints: ['Email analysis unavailable', 'Please check API configuration'],
      actionItems: []
    });
  }
}
