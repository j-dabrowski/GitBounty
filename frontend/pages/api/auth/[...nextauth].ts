import NextAuth from 'next-auth'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import { signIn } from 'next-auth/react'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      profile(profile: GithubProfile) {
        console.log('profile', profile)
        return {
          id: profile.id.toString(),
          name: profile.name,
          userName: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     console.log('profile', profile)
  //     return true
  //   },
  // },
})
