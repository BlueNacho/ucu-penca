'use server'
import { Phase } from "@/types/types"
import { pool } from "./postgrePool"

export async function getPhases(): Promise<Phase[]> {
    const client = await pool.connect();

    try {
        const query = `
            SELECT * FROM phases
        `;
        const res = await client.query(query);
        return res.rows as Phase[];
    } catch (error) {
        console.error("Error fetching phases:", error);
        throw error;
    } finally {
        client.release();
    }

}