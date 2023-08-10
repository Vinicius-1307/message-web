import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials, req) {
        try {
          const user = await axios.post(`http://localhost:8000/api/login`, {
            password: credentials.password,
            email: credentials.email,
          });
          return { status: 'success', data: user.data };
        } catch (error) {
          console.log(error);
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        const updatedSession = {
          ...token,
          user: session.user,
        };

        return updatedSession;
      }

      if (user) {
        token.accessToken = user.data.data.token;
        token.user = user.data.data.user;
        token.has_ml_token = user.data.data.has_ml_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.has_ml_token = token.has_ml_token;

      return session;
    },
  },

  options: {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/',
      signOut: '/',
      error: '/',
      verifyRequest: '/',
      newUser: '/',
    },
  },
};

export default NextAuth(authOptions);
