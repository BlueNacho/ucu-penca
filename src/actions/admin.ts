'use server'

import * as z from "zod";
import { PredictionSchema } from "@/schemas";
import { pool } from "@/data/postgrePool";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-utils";
import { getMatchById } from "@/data/matches";
import { getTeamById } from "@/data/teams";
import { getUsers } from "@/data/users";

export async function calculateScoresByMatchId( matchId: string, championId?: number, runnerUpId?: number) {
    const client = await pool.connect();

    const { status, phase } = await getMatchById(matchId);

    if (status !== "finalizado") {
        return { error: "Debe finalizar el partido antes de calcular los puntajes" };
    }

    if (phase === 6) {
        setChampionAndRunnerUp(championId || 0, runnerUpId || 0);
    }

    try {
        await client.query('BEGIN');

        const { rows: predictions } = await client.query(`
            SELECT 
                predictions.match_id, 
                predictions.user_id, 
                predictions.home_team_goals, 
                predictions.away_team_goals, 
                matches.home_team_id, 
                matches.away_team_id,
                matches.phase, 
                matches.home_team_goals as home_team_goals_match, 
                matches.away_team_goals as away_team_goals_match
            FROM predictions
            JOIN matches ON predictions.match_id = matches.id
            WHERE predictions.match_id = $1
        `, [matchId]);

        for (const prediction of predictions) {
            const { home_team_goals, away_team_goals, home_team_goals_match, away_team_goals_match } = prediction;

            let points = 0;

            if (home_team_goals === home_team_goals_match && away_team_goals === away_team_goals_match) {
                points = 4;
            } else if ((home_team_goals > away_team_goals && home_team_goals_match > away_team_goals_match) || (home_team_goals < away_team_goals && home_team_goals_match < away_team_goals_match) || (home_team_goals === away_team_goals && home_team_goals_match === away_team_goals_match)) {
                points = 2;
            }

            await client.query(`
                UPDATE predictions
                SET score = $1
                WHERE match_id = $2 AND user_id = $3
            `, [points, prediction.match_id, prediction.user_id]);

            await client.query(`
                UPDATE users
                SET score = score + $1
                WHERE id = $2
            `, [points, prediction.user_id]);
        }

        await client.query('COMMIT');

        return { success: "Acción exitosa" };
    } catch (error) {
        await client.query('ROLLBACK');
        return { error: "Error al calcular los puntajes" };
    } finally {
        client.release();
        revalidatePath('/partidos');
    }
}

export async function setChampionAndRunnerUp(championId: number, runnerUpId: number) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const users = await getUsers();

        await client.query(`
            UPDATE teams
            SET champion = TRUE
            WHERE id = $1
        `, [championId]);

        await client.query(`
            UPDATE teams
            SET runner_up = TRUE
            WHERE id = $1
        `, [runnerUpId]);

        for (const user of users) {
            const { champion_team_id, runner_up_team_id } = user;

            let points = 0;

            if (parseInt(champion_team_id) === championId) {
                points = 10;
            }

            if (parseInt(runner_up_team_id) === runnerUpId) {
                points += 5;
            }

            await client.query(`
                UPDATE users
                SET score = score + $1
                WHERE id = $2
            `, [points, user.id]);
        }

        await client.query('COMMIT');

        return { success: "Acción exitosa" };
    } catch (error) {
        await client.query('ROLLBACK');
        return { error: "Error al definir campeon y subcampeon" };
    } finally {
        client.release();
        revalidatePath('/partidos');
    }
}