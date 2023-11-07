import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import CredentailsProvider from 'next-auth/providers/credentials';
import { GithubProfile } from "next-auth/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()

export const options: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                console.log(profile);
                return {
                    ...profile,
                    role: profile.role || 'user2',
                    id: profile.id.toString(),
                    image: profile.avatar_url
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentailsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials) {
                //TODO Set this up to get real users
                //Docs: https://next-auth.js.org/configuration/providers/credentials
                // const user = { ... these are user options like name and password, role: 'admin' }
                // use database to save user data. Need to research how to safely store passwords

                // if (credentials?.username === user.name && credentials?.password === user.password) {
                //     return user;
                // } else {
                //     return null;
                // }
                const testVar = "hello";
                console.log(testVar);
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                console.log({jwtLogged: "jwtLogged", ...user})
                const administrators = [ 'stephensouvall@gmail.com' ]
                token.isAdmin = administrators.includes(user?.email as string)
                token.role = token.isAdmin ? 'admin' : user.role;
                return token;
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        }
    }
}