
// import NextAuth, { NextAuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
// import { User } from '@/models/User';
// import dbConnect from '@/lib/mongodb';
// import { NextApiRequest, NextApiResponse } from 'next';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID as string,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account  }: { user: any, account: any }, req: NextApiRequest, res: NextApiResponse) {
//       console.log(user)
//       console.log(account)
//       await dbConnect();
//       if (account.provider === 'google' || account.provider === 'facebook' ) {
//         let existingUser = await User.findOne({ email: user.email });
//         if (!existingUser) {
//           const existingUser = new User({
//             username: user.name,
//             email: user.email,
//             image: user.image,
//             provider: account.provider,
//             isVerified: true,
//           });
//           await existingUser.save();
//         }
//       }
//       return true;
//     },

//     async session({ session , token }) {
//       await dbConnect();
//       // Attach additional data to the session
//       if(session?.user?.email){
//           const existingUser = await User.findOne({ email: session.user.email });
//         }
//       if (existingU) {
//         session.user.id = existingUser._id; // Attach the user ID
//         session.user.isAdmin = existingUser.isAdmin; // Attach admin status
//       }

//       return session; // Return the updated session
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id; // Attach user ID to the token
//       }
//       return token;
//     },

//     async redirect({ url, baseUrl }) {
//       // Redirect to the dashboard after sign up or sign in
//       if (url === '/api/auth/SignUp' || url === '/api/auth/Signin') {
//         return '/Layout/dashbord'; // Your dashboard page
//       }
//       return baseUrl;
//     },
//   },
//   session: {
//     strategy: 'jwt',
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions, DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { User } from '@/models/User';
import dbConnect from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// Extend the NextAuth session type to include `id` and `isAdmin`
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      isAdmin: boolean;
    } & DefaultSession['user'];
  }
}

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
    async signIn({ user, account }: { user: any, account: any }, req: NextApiRequest, res: NextApiResponse) {
      await dbConnect();
      if (account.provider === 'google' || account.provider === 'facebook') {
        let existingUser = await User.findOne({ email: user.email });
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

    async session({ session, token }) {
      await dbConnect();

      // Ensure session.user exists before querying
      if (session?.user?.email) {
        const existingUser = await User.findOne({ email: session.user.email });

        if (existingUser) {
          session.user.id = existingUser._id; // Attach the user ID
          session.user.isAdmin = existingUser.isAdmin; // Attach admin status
        }
      }

      return session; // Return the updated session
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach user ID to the token
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
