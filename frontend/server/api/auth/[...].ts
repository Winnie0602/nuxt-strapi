import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
const config = useRuntimeConfig()

interface Credentials {
  identifier: string
  password: string
}

interface ApiLoginResult {
  jwt: string
  user: {
    id: number
    documentId: string
    username: string
    email: string
  }
}

export default NuxtAuthHandler({
  secret: config.authSecret,
  pages: {
    signIn: '/login',
    newUser: '/learning/vocabulary',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        identifier: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials: Credentials) {
        const config = useRuntimeConfig()

        try {
          const response = await $fetch<ApiLoginResult>(
            `${config.strapiBaseUrl}/auth/local`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: {
                identifier: credentials.identifier,
                password: credentials.password,
              },
            },
          )

          if (response?.user && response?.jwt) {
            return { ...response.user, jwt: response.jwt }
          } else {
            throw new Error('Invalid credentials')
          }
        } catch (error) {
          console.error('Login failed:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      // 登入操作才為true
      const isSignIn = !!user

      try {
        if (isSignIn && account) {
          if (account.provider === 'credentials') {
            token.user = user
          }
        }
        return Promise.resolve(token)
      } catch (error) {
        console.log(error)
        return Promise.resolve(token)
      }
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configurationß/callbacks#session-callback
    session: async ({ session, token }) => {
      session.user = token.user

      return Promise.resolve(session)
    },
  },
})
