'use server';

import { Team } from "../types/types";
import { pool } from "./postgrePool";

export async function fetchTeams() {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM teams");
        return res.rows as Team[];
    } catch (error) {
        console.error("Error fetching matches:", error);
        throw error;
    } finally {
        client.release();
    }
}