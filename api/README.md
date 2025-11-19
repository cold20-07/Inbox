# Serverless API Functions

These are Vercel serverless functions that replace the Express backend for production deployment.

## Endpoints

### Health Check
- **Path**: `/api/health`
- **Method**: GET
- **Description**: Check if API is running
- **Response**: `{ status: 'ok', message: 'Inbox Unclutter API is running' }`

### Email Analysis
- **Path**: `/api/emails/analyze`
- **Method**: POST
- **Description**: Analyze email content using Google Gemini AI
- **Request Body**:
  ```json
  {
    "sender": "sender@example.com",  // optional
    "subject": "Email subject",      // required
    "body": "Email content..."       // required
  }
  ```
- **Response**:
  ```json
  {
    "subject": "Email subject",
    "senderEmail": "sender@example.com",
    "senderName": "sender@example.com",
    "category": "promotion",
    "priorityScore": 75,
    "summary": "Brief summary of the email",
    "keyPoints": ["Point 1", "Point 2"],
    "actionItems": ["Action 1"]
  }
  ```

## Environment Variables

Required in Vercel project settings:
- `GEMINI_API_KEY` - Google Gemini API key

## Local Testing

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
vercel dev
```

This will start a local server that mimics Vercel's production environment.

## Notes

- All functions include CORS headers for cross-origin requests
- Functions auto-scale based on traffic
- Cold start time is typically < 1 second
- Each function has a 10-second execution timeout (Vercel hobby plan)
