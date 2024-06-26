'use server';

import { MatchDisplayed } from "../types/types";
import { pool } from "./postgrePool";
import { unstable_noStore as noStore } from 'next/cache';

export async function getPredictionsDisplayed(userId: string): Promise<MatchDisplayed[]> {
    noStore()
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
                p.name AS phase_name,
                m.group_name,
                m.status,
                pr.home_team_goals AS prediction_home_team_goals,
                pr.away_team_goals AS prediction_away_team_goals,
                pr.score AS prediction_score
            FROM matches m
            JOIN teams ht ON m.home_team_id = ht.id
            JOIN teams at ON m.away_team_id = at.id
            JOIN phases p ON m.phase = p.id
            JOIN predictions pr ON m.id = pr.match_id AND pr.user_id = $1
            ORDER BY m.start_time ASC
        `;
        const res = await client.query(query, [userId]);
        return res.rows as MatchDisplayed[];
    } catch (error) {
        console.error("Error fetching matches with predictions:", error);
        throw error;
    } finally {
        client.release();
    }
}