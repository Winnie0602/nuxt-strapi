// file: ~/server/api/auth/[...].ts
// import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
const config = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: config.authSecret,
  pages: {
    signIn: '/login'
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        identifier: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials: any) {
        const response = await $fetch(`${config.strapiBseUrl}/auth/local/`, {
          method: 'POST',
          body: JSON.stringify({
            identifier: credentials.identifier,
            password: credentials.password,
          }),
        })

        if (response.user) {
          const u = {
            id: response.id,
            name: response.user.username,
            email: response.user.email,
          }
          return u
        } else {
          return null
        }
      },
    }),
  ],
})
