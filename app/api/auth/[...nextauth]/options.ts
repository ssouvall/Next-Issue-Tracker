import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import CredentailsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
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
                // const user = { ... these are user options like name and password }

                // if (credentials?.username === user.name && credentials?.password === user.password) {
                //     return user;
                // } else {
                //     return null;
                // }
                return null;
            }
        })
    ]
}