'use server'

import * as z from "zod";
import { PredictionSchema } from "@/schemas";
import { pool } from "@/data/postgrePool";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-utils";
import { getMatchById } from "@/data/matches";

export default async function setPrediction(matchId: string, values: z.infer<typeof PredictionSchema>) {
    const validatedFields = PredictionSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos invalidos" };
    }

    const { start_time } = await getMatchById(matchId);

    if (new Date(start_time).getTime() - new Date().getTime() <= 3600000) {
        return { error: "Solo puedes ingresar predicciones hasta una hora antes del inicio del partido" };
    }

    const { home_team_goals, away_team_goals } = validatedFields.data;

    const session = await getSession();

    const userId = session.user?.id;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(`
            INSERT INTO predictions (match_id, user_id, home_team_goals, away_team_goals)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (match_id, user_id) DO UPDATE SET home_team_goals = EXCLUDED.home_team_goals, away_team_goals = EXCLUDED.away_team_goals
        `, [matchId, userId, home_team_goals, away_team_goals]);

        await client.query('COMMIT');
            
        return { success: "Predicción guardada con exito" };
    } catch (error) {
        await client.query('ROLLBACK');
        return { error: "Error al guardar la predicción" };
    } finally {
        client.release();
        revalidatePath('/partidos');
    }
}
