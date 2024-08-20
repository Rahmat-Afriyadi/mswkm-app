import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_API + "/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const resResult = await res.json();
        if (resResult.status == "inactive") throw new Error("inactive");
        if (resResult.status == "fail") throw new Error(resResult.message);
        return {
          name: resResult.name,
          accessToken: resResult.access_token,
          refreshToken: resResult.refresh_token,
          // accessToken: resResult.access_token,
          // refreshToken: resResult.refresh_token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // if(trigger==="update"){
      //   token.user.password_change_counter = session.user.password_change_counter
      // }

      if (user) token.user = user;
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    },

    // async redirect({ url, baseUrl }) {
    // console.log('url', url);
    // console.log('baseUrl', baseUrl);

    // return url.startsWith(baseUrl) ? url : baseUrl + '/';
    // return url;
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
