import { Pool } from "pg";

export const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
});

// Puedes agregar un listener para manejar errores de conexión del pool
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
