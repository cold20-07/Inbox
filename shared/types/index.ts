export interface User {
  id: string
  email: string
  name?: string
  avatarUrl?: string
  createdAt: Date
}

export interface EmailSummary {
  id: string
  userId: string
  messageId: string
  senderEmail: string
  senderName?: string
  subject: string
  receivedAt: Date
  category: string
  priorityScore: number
  aiSummary: string
  keyPoints?: string[]
  actionItems?: string[]
  isArchived: boolean
  isRead: boolean
}

export interface Digest {
  id: string
  userId: string
  digestDate: Date
  summaryText: string
  emailCount: number
}
