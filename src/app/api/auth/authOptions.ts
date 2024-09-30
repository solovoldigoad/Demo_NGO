import { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { User } from '@/models/User';
import dbConnect from '@/lib/mongodb';

// Extend the NextAuth session type to include `id` and `isAdmin`
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      isAdmin: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    isAdmin: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isAdmin: boolean;
  }
}

// Define the NextAuth configuration options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: { name: string; email: string; image: string };
      account: { provider: string };
    }) {
      await dbConnect();

      if (account.provider === 'google' || account.provider === 'facebook') {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = new User({
            username: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
            isVerified: true,
          });
          await newUser.save();
        }
      }
      return true;
    },

    async session({ session }) {
      await dbConnect();

      // Ensure session.user exists before querying
      if (session?.user?.email) {
        const existingUser = await User.findOne({ email: session.user.email });

        if (existingUser) {
          session.user.id = existingUser._id.toString(); // Attach the user ID
          session.user.isAdmin = existingUser.isAdmin; // Attach admin status
        }
      }

      return session; // Return the updated session
    },

    async jwt({
      token,
      user,
    }: {
      token: { id?: string; isAdmin?: boolean };
      user?: { id: string; isAdmin: boolean };
    }) {
      if (user) {
        token.id = user.id; // Attach user ID to the token
        token.isAdmin = user.isAdmin; // Attach admin status to the token
      }
      return token;
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirect to the dashboard after sign up or sign in
      if (url === '/api/auth/SignUp' || url === '/api/auth/Signin') {
        return '/Layout/dashboard'; // Your dashboard page
      }
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
  },
};
