import User from "@/models/User"
import { connectToDB } from "@/utils/database"
import bcrypt from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const options = {
  providers: [
    GitHubProvider({

      profile(profile) {
        // console.log("Profile GitHub: ", profile)

        let userRole = "GitHub User"
        if (profile?.email == "adityasinghrajawat393@gmail.com") {
          userRole = "admin"
        }

        return {
          ...profile,
          role: userRole,
          image: profile.avatar_url
        }
      },

      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({

      profile(profile) {
        // console.log("Profile Google: ", profile)

        let userRole = "Google User"
        if (profile?.email == "adityasinghrajawat393@gmail.com") {
          userRole = "admin"
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
          image: profile.picture
        }
      },

      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your password",
        },
        role: {
          label: "role:",
        }
      },
      async authorize(credentials) {
        try {
          await connectToDB()
          const { email, password, role } = credentials
          // console.log(credentials);
          const existingUser = await User.findOne({ email })

          if (existingUser) {
            const match = await bcrypt.compare(password, existingUser.password)

            if (match) {
              return existingUser
            }
          }
        } catch (error) { }
        return null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}
