import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
    updateAge: 8 * 60 * 60,
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
        token: {
          label: "Token",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
        auto_login: {
          label: "Auto Login",
          type: "checkbox",
        },
        isActivation: {
          abel: "Auto Login",
          type: "checkbox",
        },
      },

      async authorize(credentials) {
        let res;
        if (credentials?.isActivation) {
          res = await fetch(process.env.NEXT_PUBLIC_BASE_API + "/tokens/signin/by-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              token: credentials?.token,
            }),
          });
          console.log("kesini gk sih ", credentials);
        } else {
          res = await fetch(process.env.NEXT_PUBLIC_BASE_API + "/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
              auto_login: credentials?.auto_login,
            }),
          });
        }
        const resResult = await res.json();
        if (resResult.status == "fail") throw new Error(resResult.message);
        if (resResult.status == "inactive") throw new Error("inactive");
        return {
          name: resResult.name,
          email: resResult.email,
          is_admin: resResult.is_admin,
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
