const { Client } = require("pg");
const bcrypt = require("bcrypt");

async function createEnums(client) {
  try {
    // Create the "fase_enum" enum type if it doesn't exist
    await client.query(`
      CREATE TYPE fase_enum AS ENUM ('grupos', 'cuartos', 'semifinales', 'final');
    `);

    // Create the "estado_equipo_enum" enum type if it doesn't exist
    await client.query(`
      CREATE TYPE estado_equipo_enum AS ENUM ('clasificado', 'eliminado');
    `);

    // Create the "estado_partido_enum" enum type if it doesn't exist
    await client.query(`
      CREATE TYPE estado_partido_enum AS ENUM ('pendiente', 'jugando', 'finalizado');
    `);

    // Create the "carrera_enum" enum type if it doesn't exist
    await client.query(`
      CREATE TYPE carrera_enum AS ENUM ('ing. Informática', 'medicina');
    `);

    console.log(`Created ENUM types`);
  } catch (error) {
    console.error("Error creating ENUMs:", error);
    throw error;
  }
}

async function seedEquipos(client) {
  try {
    // Create the "equipo" table if it doesn't exist
    const createEquipoTable = await client.query(`
      CREATE TABLE IF NOT EXISTS equipo (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        fase fase_enum NOT NULL,
        estado_equipo estado_equipo_enum NOT NULL
      );
    `);

    console.log(`Created "equipo" table`);

    // Insert placeholder data into the "equipo" table
    const insertEquipoData = await client.query(`
      INSERT INTO equipo (nombre, fase, estado_equipo)
      VALUES 
        ('Equipo A', 'grupos', 'clasificado'),
        ('Equipo B', 'cuartos', 'eliminado'),
        ('Equipo C', 'semifinales', 'clasificado')
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log(`Seeded equipo data`);

    return {
      createEquipoTable,
      insertEquipoData,
    };
  } catch (error) {
    console.error("Error seeding equipo:", error);
    throw error;
  }
}

async function seedUsuarios(client) {
  try {
    // Create the "usuario" table if it doesn't exist
    const createUsuarioTable = await client.query(`
      CREATE TABLE IF NOT EXISTS usuario (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        mail VARCHAR(100) UNIQUE NOT NULL,
        contraseña VARCHAR(100) NOT NULL,
        carrera carrera_enum NOT NULL,
        puntaje INT NOT NULL,
        elec_campeon INT,
        elec_subcampeon INT,
        admin BOOLEAN NOT NULL,
        FOREIGN KEY (elec_campeon) REFERENCES equipo (id),
        FOREIGN KEY (elec_subcampeon) REFERENCES equipo (id)
      );
    `);

    console.log(`Created "usuario" table`);

    // Insert placeholder data into the "usuario" table
    const insertUsuarioData = await client.query(`
      INSERT INTO usuario (nombre, apellido, mail, contraseña, carrera, puntaje, elec_campeon, elec_subcampeon, admin)
      VALUES 
        ('Juan', 'Pérez', 'juan@example.com', '${await bcrypt.hash(
          "password1",
          10
        )}', 'ing. Informática', 100, 1, 2, true),
        ('María', 'García', 'maria@example.com', '${await bcrypt.hash(
          "password2",
          10
        )}', 'medicina', 90, 2, 3, false),
        ('Carlos', 'López', 'carlos@example.com', '${await bcrypt.hash(
          "password3",
          10
        )}', 'medicina', 80, 3, 1, false)
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log(`Seeded usuario data`);

    return {
      createUsuarioTable,
      insertUsuarioData,
    };
  } catch (error) {
    console.error("Error seeding usuario:", error);
    throw error;
  }
}

async function seedPartidos(client) {
  try {
    // Create the "partido" table if it doesn't exist
    const createPartidoTable = await client.query(`
      CREATE TABLE IF NOT EXISTS partido (
        id SERIAL PRIMARY KEY,
        id_equipo_local INT NOT NULL,
        id_equipo_visitante INT NOT NULL,
        goles_equipo_local INT NOT NULL,
        goles_equipo_visitante INT NOT NULL,
        fecha_comienzo TIMESTAMP NOT NULL,
        fase fase_enum NOT NULL,
        estado_partido estado_partido_enum NOT NULL,
        FOREIGN KEY (id_equipo_local) REFERENCES equipo (id),
        FOREIGN KEY (id_equipo_visitante) REFERENCES equipo (id)
      );
    `);

    console.log(`Created "partido" table`);

    // Insert placeholder data into the "partido" table
    const insertPartidoData = await client.query(`
      INSERT INTO partido (id_equipo_local, id_equipo_visitante, goles_equipo_local, goles_equipo_visitante, fecha_comienzo, fase, estado_partido)
      VALUES 
        (1, 2, 2, 1, NOW(), 'grupos', 'finalizado'),
        (2, 3, 1, 1, NOW(), 'cuartos', 'pendiente'),
        (3, 1, 0, 0, NOW(), 'semifinales', 'jugando')
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log(`Seeded partido data`);

    return {
      createPartidoTable,
      insertPartidoData,
    };
  } catch (error) {
    console.error("Error seeding partido:", error);
    throw error;
  }
}

async function seedPredicciones(client) {
  try {
    // Create the "prediccion" table if it doesn't exist
    const createPrediccionTable = await client.query(`
      CREATE TABLE IF NOT EXISTS prediccion (
        id_partido INT NOT NULL,
        id_usuario INT NOT NULL,
        goles_equipo_local INT NOT NULL,
        goles_equipo_visitante INT NOT NULL,
        PRIMARY KEY (id_partido, id_usuario),
        FOREIGN KEY (id_partido) REFERENCES partido (id),
        FOREIGN KEY (id_usuario) REFERENCES usuario (id)
      );
    `);

    console.log(`Created "prediccion" table`);

    // Insert placeholder data into the "prediccion" table
    const insertPrediccionData = await client.query(`
      INSERT INTO prediccion (id_partido, id_usuario, goles_equipo_local, goles_equipo_visitante)
      VALUES 
        (1, 1, 2, 1),
        (1, 2, 1, 2),
        (1, 3, 1, 1)
      ON CONFLICT (id_partido, id_usuario) DO NOTHING;
    `);

    console.log(`Seeded prediccion data`);

    return {
      createPrediccionTable,
      insertPrediccionData,
    };
  } catch (error) {
    console.error("Error seeding prediccion:", error);
    throw error;
  }
}

async function main() {
  const client = new Client({
    connectionString: process.env.POSTGRE_URL,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
  });

  try {
    await client.connect();
    await createEnums(client);
    await seedEquipos(client);
    await seedUsuarios(client);
    await seedPartidos(client);
    await seedPredicciones(client);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
