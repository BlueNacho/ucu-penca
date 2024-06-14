import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

// Puedes agregar un listener para manejar errores de conexión del pool
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
