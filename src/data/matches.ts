'use server';

import { MatchDisplayed } from "../types/types";
import { pool } from "./postgrePool";

export async function fetchMatchesDisplayed(): Promise<MatchDisplayed[]> {
    const client = await pool.connect();

    try {
        const query = `
            SELECT 
                m.id,
                m.home_team_id,
                ht.name AS home_team_name,
                ht.code AS home_team_code,
                m.away_team_id,
                at.name AS away_team_name,
                at.code AS away_team_code,
                m.home_team_goals,
                m.away_team_goals,
                m.start_time,
                m.phase,
                m.status
            FROM matches m
            JOIN teams ht ON m.home_team_id = ht.id
            JOIN teams at ON m.away_team_id = at.id
        `;
        const res = await client.query(query);
        return res.rows as MatchDisplayed[];
    } catch (error) {
        console.error("Error fetching matches:", error);
        throw error;
    } finally {
        client.release();
    }
}