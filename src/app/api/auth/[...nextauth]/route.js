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
          label: "Auto Login",
          type: "checkbox",
        },
        isAdmin: {
          label: "Is Admin",
          type: "checkbox",
        },
      },

      async authorize(credentials) {
        let res;
        if (credentials.isAdmin == "false") {
          if (credentials?.isActivation == "true") {
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
        } else {
          res = await fetch(process.env.NEXT_PUBLIC_BASE_API + "/auth/login/admin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });
        }

        const resResult = await res.json();
        if (resResult.status == "fail") throw new Error(resResult.message);
        if (resResult.status == "inactive") throw new Error("inactive");
        return {
          name: resResult.name,
          email: resResult.email,
          is_admin: credentials?.isAdmin == "true" ? true : false,
          accessToken: resResult.access_token,
          refreshToken: resResult.refresh_token,
          role: credentials?.isAdmin ? resResult.role_name : "User",
          permissions: credentials?.isAdmin == "true" ? resResult.permissions : undefined,
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
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
