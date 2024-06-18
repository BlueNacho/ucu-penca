'use server';

import * as z from "zod";
import { UpdateMatchSchema } from "@/schemas";
import { pool } from "@/data/postgrePool";

export async function updateMatch(matchId: string, values: z.infer<typeof UpdateMatchSchema>) {
    console.log(values)
    const validatedFields = UpdateMatchSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos invalidos" };
    }

    const { home_team_id, away_team_id, home_team_goals, away_team_goals, group_name, phase, start_time, status } = validatedFields.data;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`
            UPDATE matches
            SET home_team_id = $1, away_team_id = $2, home_team_goals = $3, away_team_goals = $4, group_name = $5, phase = $6, start_time = $7, status = $8
            WHERE id = $9
            RETURNING *
        `, [home_team_id, away_team_id, home_team_goals, away_team_goals, group_name, phase, start_time, status, matchId]);

        await client.query('COMMIT');
        
        return { success: "Partido actualizado con exito" };
    } catch (error) {
        await client.query('ROLLBACK');
        return { error: "Error al actualizar el partido" };
    } finally {
        client.release();
    }
}