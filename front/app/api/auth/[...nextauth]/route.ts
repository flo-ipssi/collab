import NextAuth from "next-auth/next";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    session: {
      strategy: "jwt",
    },
  
    pages: {
      signIn: "/login",
    },
  
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: {},
          password: {},
        },
        async authorize(credentials, req) {
          const res = await axios.post(
            process.env.API_BASE_URL + "api/authentication_token",
            credentials,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          if (res.status === 200) {
            const { name, id, phone, role, picture } = res.data.user;
            const user = {
              id,
              name,
              phone,
              role,
              picture,
              token: res.data.token,
            };
            return user; // User interface we declared in next-auth.d.ts
          } else throw new Error("Login failed");
        },
      }),
    ],
  });

export { handler as GET,   handler as POST}