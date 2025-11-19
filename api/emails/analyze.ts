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
    // Validate request body
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is required' });
    }

    const { sender, subject, body } = req.body;

    // Validate required fields
    if (!subject || !body) {
      return res.status(400).json({ error: 'Subject and body are required' });
    }

    // Validate types
    if (typeof subject !== 'string' || typeof body !== 'string') {
      return res.status(400).json({ error: 'Subject and body must be strings' });
    }

    if (sender && typeof sender !== 'string') {
      return res.status(400).json({ error: 'Sender must be a string' });
    }

    // Validate lengths
    if (subject.length > 200) {
      return res.status(400).json({ error: 'Subject must be less than 200 characters' });
    }

    if (body.length > 10000) {
      return res.status(400).json({ error: 'Body must be less than 10,000 characters' });
    }

    // Sanitize inputs
    const sanitizedSender = sender ? String(sender).trim() : 'Unknown';
    const sanitizedSubject = String(subject).trim();
    const sanitizedBody = String(body).trim();

    const prompt = `Analyze this email and respond ONLY with a valid JSON object (no markdown, no extra text):

From: ${sanitizedSender}
Subject: ${sanitizedSubject}
Body: ${sanitizedBody.substring(0, 10000)}

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

    // Validate analysis response
    if (!analysis || typeof analysis !== 'object') {
      throw new Error('Invalid analysis response');
    }

    return res.json({
      subject: sanitizedSubject,
      senderEmail: sanitizedSender === 'Unknown' ? 'unknown@example.com' : sanitizedSender,
      senderName: sanitizedSender,
      category: String(analysis.category || 'other'),
      priorityScore: Number(analysis.priorityScore) || 50,
      summary: String(analysis.summary || 'No summary available'),
      keyPoints: Array.isArray(analysis.keyPoints) ? analysis.keyPoints : [],
      actionItems: Array.isArray(analysis.actionItems) ? analysis.actionItems : []
    });
  } catch (error) {
    console.error('Analyze error:', error);
    
    // Return fallback response with safe defaults
    const fallbackSubject = req.body?.subject ? String(req.body.subject).substring(0, 200) : 'Unknown';
    const fallbackSender = req.body?.sender ? String(req.body.sender).substring(0, 100) : 'Unknown';
    
    return res.json({
      subject: fallbackSubject,
      senderEmail: fallbackSender === 'Unknown' ? 'unknown@example.com' : fallbackSender,
      senderName: fallbackSender,
      category: 'other',
      priorityScore: 50,
      summary: `Email from ${fallbackSender}: ${fallbackSubject}`,
      keyPoints: ['Email analysis unavailable', 'Please check API configuration'],
      actionItems: []
    });
  }
}
