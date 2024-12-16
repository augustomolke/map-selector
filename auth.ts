import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { object, string } from "zod";

const api_url = process.env.GSHEET_API_URL;

const signInSchema = object({
  driverId: string({ required_error: "Driver ID é obrigatório" }).min(
    1,
    "Driver ID é obrigatório"
  ),
  password: string({ required_error: "Senha é obrigatória" })
    .min(4, "São os 4 últimos dígitos do seu telefone cadastrado")
    .min(4, "São os 4 últimos dígitos do seu telefone cadastrado"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/login" },
  trustHost: true,
  callbacks: {
    async jwt({ user, token, trigger, session }) {
      if (user) {
        token.user = user;
      }

      if (trigger == "update") {
        token.user = session.user;
      }

      return token;
    },
    async session({ session, token, trigger }: any) {
      session.user = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        driverId: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const parsed = signInSchema.safeParse(credentials);

        if (!parsed.success) {
          throw new AuthError(parsed.error.issues[0].message);
        }

        const { driverId, password } = parsed.data;

        // logic to salt and hash password

        // logic to verify if the user exists

        const body = JSON.stringify({
          method: "GET",
          sheet: "drivers",
          key: process.env.SECRET,
          filter: {
            driver_id: driverId,
          },
        });

        const result = await fetch(api_url, {
          method: "POST",
          body,
        });

        user = await result.json();

        if (user.status != 200) {
          throw new AuthError("Driver ID não encontrado");
        }

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new AuthError("Driver ID não encontrado");
        }

        if (!(user.data.phone?.toString().slice(-4) == password)) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new AuthError("Telefone Incorreto");
        }

        // return user object with their profile data
        return user.data;
      },
    }),
  ],
});
