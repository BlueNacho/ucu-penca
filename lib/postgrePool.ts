import { Pool } from "pg";

export const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
});

// Puedes agregar un listener para manejar errores de conexión del pool
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
