// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import Credentials from 'next-auth/providers/credentials';
// import { z } from 'zod';
// import { getUser } from '../data/data';
// import bcrypt from 'bcrypt';
// import { signInSchema } from '../zod';


// export const { auth, signIn, signOut, handlers } = NextAuth({
//     // ...authConfig,
//     providers: [
//         Credentials({
//             async authorize(credentials) {
//                 const { email, password } = await signInSchema.parseAsync(credentials);
                
//                 const parsedCredentials = signInSchema.safeParse(credentials);

//                 const user = await getUser(email);

//                 if (!user) return null;

//                 const passwordsMatch = await bcrypt.compare(password, user.password);

//                 if (passwordsMatch) return user;

//                 return null;

//                 // if (parsedCredentials.success) {
//                 //     const { email, password } = parsedCredentials.data;
//                 //     const user = await getUser(email);
//                 //     if (!user) return null;
//                 //     const passwordsMatch = await bcrypt.compare(password, user.password);

//                 //     if (passwordsMatch) return user;
//                 // }

//                 // console.log('Invalid credentials');
//                 // return null;
//             },

//         }),
//     ],
// });

import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "../zod"
import bcrypt from 'bcrypt';
import { getUser } from "../data/data"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = await signInSchema.parseAsync(credentials);

                    const user = await getUser(email);

                    if (!user) {
                        throw new Error("User not found.");
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    if (error instanceof ZodError) {
                        console.error("Validation error:", error.errors);
                        return null;
                    }
                    console.error("Unexpected error:", error);
                    return null;
                }
            },
        }),
    ],
});


