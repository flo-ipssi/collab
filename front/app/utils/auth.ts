import { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";

// type LoginResponse = {
//   token: string;
//   user: {
//     id: string;
//     name: string;
//     phone: string;
//     role: string;
//     picture: string;
//   };
// };

export const authOptions = {
  session:{
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_URL,
  debug: process.env.NODE_ENV === "development",
  callbacks:{
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token); // JWT interface we declared
    },
    // async session({ session, token }) {
    //   session.user = token.user as string;
    //   return session; // Session interface we declared
    // },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "acme@collab.com" },
        password: { label: "Password", type: "password", placeholder: "*******" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        throw new Error("Email or Password is not correct");
        return null;
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      //   authorization: {
      //     params: {
      //       prompt: "consent",
      //       access_type: "offline",
      //       response_type: "code"
      //     }
      //   }
    }),
  ],
} satisfies NextAuthOptions;
