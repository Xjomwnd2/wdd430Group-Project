// app/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        
        // Find user by email
        const user = await User.findOne({ email: credentials.email });
        
        if (user && await user.matchPassword(credentials.password)) {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        }
        
        return null;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token._id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user._id = token._id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
});

// utils/authMiddleware.js
import { getSession } from 'next-auth/react';

// Middleware to protect API routes
export const authMiddleware = async (req, res) => {
  const session = await getSession({ req });
  
  if (!session) {
    res.status(401).json({ success: false, message: 'Not authenticated' });
    return false;
  }
  
  return session;
};
