import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "./data/users";

import { LoginSchema } from "@/schemas"

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = await LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    // const user = { "email": "usuario@example.com", "password": "$2b$10$gfxsnACcc7clrB4.eobBROgVsoPFqtf2ryczplqNmQzumUD8HVpNK"}

                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }
                return null;
            }
        })
    ]
} satisfies NextAuthConfig