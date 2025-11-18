// Simple in-memory user storage (can be replaced with database later)
export interface User {
  id: string
  email: string
  password: string // hashed
  createdAt: string
}

// In-memory storage
const users: User[] = []

export const UserModel = {
  create: (user: User) => {
    users.push(user)
    return user
  },

  findByEmail: (email: string) => {
    return users.find(u => u.email === email)
  },

  findById: (id: string) => {
    return users.find(u => u.id === id)
  },

  getAll: () => users
}
