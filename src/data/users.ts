'use server';
import { User } from "@/types/types";
import { pool } from "./postgrePool";

export async function getUsers(): Promise<User[]> {
    const client = await pool.connect();

    try {
        const users = await client.query("SELECT * FROM users WHERE is_admin = false");
        return users.rows as User[];
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    } finally {
        client.release();
    }
}

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

export async function getScoreboard(): Promise<User[]> {
    const client = await pool.connect();

    try {
        const users = await client.query("SELECT * FROM users WHERE is_admin = false ORDER BY score DESC");
        return users.rows as User[];
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    } finally {
        client.release();
    }
}

export async function getRankAndScoreById(id: number): Promise<{ rank: number, score: number }> {
    const client = await pool.connect();

    try {
        const result = await client.query(`
            SELECT rank, score 
            FROM (
                SELECT id, score, ROW_NUMBER() OVER (ORDER BY score DESC) as rank 
                FROM users 
                WHERE is_admin = false
            ) as user_ranks 
            WHERE id = $1
        `, [id]);

        return { rank: result.rows[0].rank, score: result.rows[0].score };
    } catch (error) {
        console.error("Error fetching rank and score:", error);
        throw error;
    } finally {
        client.release();
    }
}