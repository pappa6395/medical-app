import { AuthOptions, NextAuthOptions } from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/lib/db";
 
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import Google from "next-auth/providers/google";
// more providers at https://next-auth.js.org/providers


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    // EmailProvider({
    //   server: process.env.GMAIL_EMAIL_SERVER || "", // any SMTP server will work
    //   from: process.env.EMAIL_FROM || "",
    //   // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    // }),
    GoogleProvider({
      //Checking if the role exista and if not add USER Bydefault
      // profile(profile) {
      //   return { role: profile.role ?? "USER", ...profile }
      // },
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile phone",
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "pap123@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log(
            "Authorize function called with credentials:",
            credentials
          );
          // Check if user credentials are Correct
          if (!credentials?.email || !credentials?.password) {
            throw { error: "No Inputs Found", status: 401 };
          }
          console.log("Pass 1 checked ");
          //Check if user exists
          const existingUser = await prismaClient.user.findUnique({
            where: { email: credentials.email },
          });
 
          if (!existingUser) {
            console.log("No user found");
            throw { error: "No user found", status: 404 };
          }
 
          console.log("Pass 2 Checked");
          console.log(existingUser);
          let passwordMatch: boolean = false;
          //Check if Password is correct
          if (existingUser && existingUser.password) {
            // if user exists and password exists
            passwordMatch = await compare(
              credentials.password,
              existingUser.password
            );
          }
          if (!passwordMatch) {
            console.log("Password incorrect");
            throw { error: "Password Incorrect", status: 401 };
          }
          console.log("Pass 3 Checked");
          const user = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          };
          //
          console.log("User Compiled");
          console.log(user);
          return user;
        } catch (error) {
          console.log("aLL Failed");
          console.log(error);
          throw { error: "Something went wrong", status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const email = token?.email ?? "";

      // Check for existing user in the database
      const dbUser = await prismaClient.user.findFirst({
        where: { email },
      });
      //console.log("Pass Checked 1");
      
      // If user doesn't exist in the database, create a new token for the first-time login
      if (!dbUser) {
        // Create user if not exist
        const newUser = await prismaClient.user.create({
          data: {
            name: user.name??"",
            email: user.email??"",
            image: user.image,
            phone: "Not Provided", // Default or placeholder
            provider: "google",
          },
        });
        token.id = user.id;
        token.role = newUser.role;
        token.picture = newUser.image;
        
        return token;
      }

      // Check and handle token existence
      if (dbUser.token) {
        //Remove the existing token from the database
        await prismaClient.user.update({
          where: { email },
          data: { token: null },
        });
      }
      //console.log("Pass Checked 2");
      
      //Refresh the token (or generate a new one as needed)
      const generateToken = () => {
        const min = 100000; // Minimum 6-figure number
        const max = 999999; // Maximum 6-figure number

        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      const newToken = generateToken();

      //Update the database with the new token
      await prismaClient.user.update({
        where: { email },
        data: { token: newToken },
      });

      //console.log("Pass Checked 3");
      //console.log("Token Updated:", token);
      
      //Return updated token information
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        picture: dbUser.image,
        token: newToken
      };
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
        (session.user as any).token  = token.token;
      }
      //console.log("Pass Checked 4");
      
      return session;
    },
  },

};