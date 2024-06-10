'use server';

import { 
    User,
    Team,
    Match,
    Prediction,
    Phase,
    Career
 } from "./definitions";

import {Client} from "pg";
import { unstable_noStore as noStore } from "next/cache";

const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
});

client.connect();

export async function fetchMatches() {
    try {
        const res = await client.query("SELECT * FROM match");
        console.log(res.rows);
        return res.rows as Match[];
    } catch (error) {
        console.error("Error fetching matches:", error);
        throw error;
    }
}

export async function fetchTeams() {
    try {
        const res = await client.query("SELECT * FROM team");
        return res.rows as Team[];
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
}

export async function fetchCareers() {
    try {
        const res = await client.query("SELECT * FROM career");
        return res.rows as Career[];
    } catch (error) {
        console.error("Error fetching carreers:", error);
        throw error;
    }
}

export async function getUser(email: string){
    try {
        const user = await client.query("SELECT * FROM users WHERE email=$1", [email]);
        return user.rows[0] as User;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

