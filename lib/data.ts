'use server';

import { 
    User,
    Team,
    Match,
    Prediction,
    Phase,
    Carrer
 } from "./definitions";

const { Client } = require("pg");
import { unstable_noStore as noStore } from "next/cache";

const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
});

client.connect();

export async function fetchTeams() {
    
    noStore();

    try {
        const res = await client.query("SELECT * FROM team");
        return res.rows as Team[];
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
}