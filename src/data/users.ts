'use server';
import { User } from "@/types/types";
import { pool } from "./postgrePool";

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const client = await pool.connect();

    try {
        const user = await client.query("SELECT * FROM users WHERE email=$1", [email]);
        return user.rows[0] as User;
    } catch (error) {
        console.error("Error fetching matches:", error);
        throw error;
    } finally {
        client.release();
    }
}

export async function getUserById(id: number): Promise<User | undefined> {
    const client = await pool.connect();

    try {
        const user = await client.query("SELECT * FROM users WHERE id=$1", [id]);
        return user.rows[0] as User;
    } catch (error) {
        console.error("Error fetching matches:", error);
        throw error;
    } finally {
        client.release();
    }
}