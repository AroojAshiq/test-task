// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/users";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},

//       async authorize(credentials) {
//         const { email, password } = credentials;
//         try {
//           await connectMongoDB();
//           const user = await User.findOne({ email });

//           if (!user) {
//             return null;
//           }
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (!passwordMatch) {
//             return null;
//           }
//           return user;
//         } catch (error) {
//           console.log("error", error);
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }

          // Return user object containing _id and email
          return { _id: user._id, email: user.email };
        } catch (error) {
          console.log("error", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },

  callbacks: {
    async jwt({ token, user }) {
      // If it's the first login, the user object will be available
      if (user) {
        token._id = user._id; // Store MongoDB _id in the token
      }
      return token;
    },

    async session({ session, token }) {
      // Add the user _id to the session
      if (token._id) {
        session.user._id = token._id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
