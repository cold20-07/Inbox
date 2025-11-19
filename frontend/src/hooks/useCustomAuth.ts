interface User {
  id: string
  email: string
  createdAt: string
}

export function useCustomAuth() {
  const user: User = {
    id: 'mock-id',
    email: 'test@example.com',
    createdAt: new Date().toISOString()
  }

  // No-op functions
  const signUp = async () => ({ user, token: 'new-token' })
  const signIn = async () => ({ user, token: 'new-token' })
  const signOut = async () => { }

  return { user, signUp, signIn, signOut }
}
