'use server';

import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/data/users";
import { pool } from "@/data/postgrePool";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth-utils";

export async function login(values: z.infer<typeof LoginSchema>) {
    // Verify credentials && get the user
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos invalidos" };
    }

    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);

    if (!user) {
        return { error: "Usuario no encontrado" };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
        return { error: "Contraseña incorrecta" };
    }

    // Create the session
    const session = await encrypt({ user });

    // Save the session in a cookie
    cookies().set("session", session, { httpOnly: true });
    
    return { success: "Autenticado con exito" };
    
}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos invalidos" };
    }

    const { name, lastname, email, password, career, champion, runnerUp } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const careerInt = parseInt(career);

    const championInt = parseInt(champion);

    const runnerUpInt = parseInt(runnerUp);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "El email esta en uso" };
    }

    const client = await pool.connect();

    try {
        await client.query(
            "INSERT INTO users (name, lastname, email, password, career_id, champion_team_id, runner_up_team_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [name, lastname, email, hashedPassword, careerInt, championInt, runnerUpInt]
        );
    } catch (error) {
        console.error("Error registrando usuario:", error);
        throw error;
    } finally {
        client.release();
    }

    console.log("Registering user", values);

    return { success: "Registrado con éxito" };
}