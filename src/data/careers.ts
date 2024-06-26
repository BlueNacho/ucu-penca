'use server';
import { Career } from "../types/types";
import { pool } from "./postgrePool";

export async function getCareerById(id: string) {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM careers WHERE id = $1", [id]);
        console.log(res.rows[0] as Career)
        return res.rows[0] as Career;
    } catch (error) {
        console.error("Error fetching match:", error);
        throw error;
    } finally {
        client.release();
    }
}

export async function getCareers() {
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