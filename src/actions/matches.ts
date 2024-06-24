'use server';

import * as z from "zod";
import { CreateMatchSchema, UpdateMatchSchema } from "@/schemas";
import { pool } from "@/data/postgrePool";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { calculateScoresByMatchId } from "./admin";


export async function createMatch(values: z.infer<typeof CreateMatchSchema>) {
    const validatedFields = CreateMatchSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos invalidos" };
    }

    const { home_team_id, away_team_id, group_name, phase, start_time, status } = validatedFields.data;

    let group_name_conditional: string | null;

    if (phase === "1" || phase === "2" || phase === "3") {
        if (!group_name) {
            return { error: "Debe seleccionar un grupo para esta fase" };
        } else {
            group_name_conditional = group_name;
        }
    } else {
        if (group_name) {
            return { error: "No puede seleccionar un grupo para esta fase" };
        } else {
            group_name_conditional = null;
        }
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`
            INSERT INTO matches (home_team_id, away_team_id, group_name, phase, start_time, status)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [home_team_id, away_team_id, group_name_conditional, phase, start_time, status]);

        await client.query('COMMIT');

        return { success: "Partido creado con exito" };
    } catch (error) {
        await client.query('ROLLBACK');
        return { error: "Error al crear el partido" };
    } finally {
        client.release();
        revalidatePath('/partidos');
    }
}

export async function updateMatch(matchId: string, values: z.infer<typeof UpdateMatchSchema>) {
    const validatedFields = UpdateMatchSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos invalidos" };
    }

    const { home_team_id, away_team_id, home_team_goals, away_team_goals, group_name, phase, start_time, status, champion, runnerUp } = validatedFields.data;

    let group_name_conditional: string | null;

    if (phase === "1" || phase === "2" || phase === "3") {
        if (!group_name) {
            return { error: "Debe seleccionar un grupo para esta fase" };
        } else {
            group_name_conditional = group_name;
        }
    } else {
        if (group_name) {
            return { error: "No puede seleccionar un grupo para esta fase" };
        } else {
            group_name_conditional = null;
        }
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`
            UPDATE matches
            SET home_team_id = $1, away_team_id = $2, home_team_goals = $3, away_team_goals = $4, group_name = $5, phase = $6, start_time = $7, status = $8
            WHERE id = $9
            RETURNING *
        `, [home_team_id, away_team_id, home_team_goals, away_team_goals, group_name_conditional, phase, start_time, status, matchId]);

        await client.query('COMMIT');

        if (status === "finalizado") {
            calculateScoresByMatchId(matchId, parseInt(champion || "0"), parseInt(runnerUp || "0"));
        }

        return { success: "Acción exitosa" };
    } catch (error) {
        await client.query('ROLLBACK');
        return { error: "Error al actualizar el partido" };
    } finally {
        client.release();
        revalidatePath('/partidos');
    }
}

export async function deleteMatch(matchId: string) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(`
            DELETE FROM matches
            WHERE id = $1
        `, [matchId]);

        await client.query('COMMIT');

        return { success: "Partido eliminado con exito" };
    } catch (error) {
        await client.query('ROLLBACK');
        return { error: "Error al eliminar el partido" };
    } finally {
        client.release();
        revalidatePath('/partidos');
        redirect('/partidos');
    }
}