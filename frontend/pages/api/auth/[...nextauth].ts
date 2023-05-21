import NextAuth from 'next-auth'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      profile(profile: GithubProfile) {
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
})
