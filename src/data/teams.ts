'use server';

import { Team } from "../types/types";
import { pool } from "./postgrePool";

export async function getTeams() {
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

export async function getTeamById(id: string) {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM teams WHERE id = $1", [id]);
        return res.rows[0] as Team;
    } catch (error) {
        console.error("Error fetching team:", error);
        throw error;
    } finally {
        client.release();
    }
}