import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  // authorize(credentials)->jwt(user)
  interface User {
    id: number | string
    documentId: string
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
    jwt: string
  }

  interface Session extends DefaultSession {
    user: {
      id: number | string
      documentId: string
      username: string
      email: string
      provider: string
      confirmed: boolean
      blocked: boolean
      createdAt: string
      updatedAt: string
      publishedAt: string
      jwt: string
    }
    expires: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken` */
  interface JWT {
    user: {
      id: number | string
      documentId: string
      username: string
      email: string
      provider: string
      confirmed: boolean
      blocked: boolean
      createdAt: string
      updatedAt: string
      publishedAt: string
      jwt: string
    }
  }
}
