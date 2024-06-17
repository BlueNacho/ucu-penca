'use server';
import { Career } from "../types/types";
import { pool } from "./postgrePool";

export async function fetchCareers() {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM careers");
        return res.rows as Career[];
    } catch (error) {
        console.error("Error fetching matches:", error);
        throw error;
    } finally {
        client.release();
    }
}