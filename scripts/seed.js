const { Client } = require("pg");
const bcrypt = require("bcrypt");
const data = require("./population-data");

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
});

const seedDatabase = async () => {
  try {
    await client.connect();

    // Habilitar la extensión uuid-ossp
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Crear las tablas si no existen
    await client.query(`
      CREATE TABLE IF NOT EXISTS Career (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS Phase (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    await client.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'group_name') THEN
              CREATE TYPE group_name AS ENUM ('A', 'B', 'C', 'D');
          END IF;
      END$$;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS Team (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(4) NOT NULL,
        phase VARCHAR(255) NOT NULL,
        group_name group_name NOT NULL,
        FOREIGN KEY (phase) REFERENCES Phase(name)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        career VARCHAR(255),
        score INT,
        champion_team_id INT,
        runner_up_team_id INT,
        is_admin BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (career) REFERENCES Career(name),
        FOREIGN KEY (champion_team_id) REFERENCES Team(id),
        FOREIGN KEY (runner_up_team_id) REFERENCES Team(id)
      );
    `);

    // Crear el tipo ENUM para el estado del partido si no existe
    await client.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'match_status') THEN
              CREATE TYPE match_status AS ENUM ('pending', 'finished');
          END IF;
      END$$;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS Match (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        home_team_id INT NOT NULL,
        away_team_id INT NOT NULL,
        home_team_goals INT DEFAULT 0,
        away_team_goals INT DEFAULT 0,
        start_time TIMESTAMP NOT NULL,
        phase VARCHAR(255) NOT NULL,
        status match_status NOT NULL,
        FOREIGN KEY (home_team_id) REFERENCES Team(id),
        FOREIGN KEY (away_team_id) REFERENCES Team(id),
        FOREIGN KEY (phase) REFERENCES Phase(name)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS Prediction (
        match_id UUID NOT NULL,
        user_id UUID NOT NULL,
        home_team_goals INT DEFAULT 0,
        away_team_goals INT DEFAULT 0,
        PRIMARY KEY (match_id, user_id),
        FOREIGN KEY (match_id) REFERENCES Match(id),
        FOREIGN KEY (user_id) REFERENCES Users(id)
      );
    `);

    // Insertar careers
    for (const career of data.careers) {
      await client.query(
        "INSERT INTO Career (name) VALUES ($1) ON CONFLICT DO NOTHING",
        [career.name]
      );
    }

    // Insertar phases
    for (const phase of data.phases) {
      await client.query(
        "INSERT INTO Phase (name) VALUES ($1) ON CONFLICT DO NOTHING",
        [phase.name]
      );
    }

    // Insertar teams
    for (const team of data.teams) {
      await client.query(
        "INSERT INTO Team (name, code, phase, group_name) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING",
        [team.name, team.code, team.phase, team.group_name]
      );
    }

    // Encriptar passwords e insertar users
    for (const user of data.users) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // 10 salt rounds
      await client.query(
        "INSERT INTO Users (first_name, last_name, email, password, career, score, champion_team_id, runner_up_team_id, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          user.first_name,
          user.last_name,
          user.email,
          hashedPassword,
          user.career,
          user.score,
          user.champion_team_id,
          user.runner_up_team_id,
          user.is_admin,
        ]
      );
    }

    // Insertar matches
    for (const match of data.matches) {
      await client.query(
        "INSERT INTO Match (home_team_id, away_team_id, home_team_goals, away_team_goals, start_time, phase, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          match.home_team_id,
          match.away_team_id,
          match.home_team_goals,
          match.away_team_goals,
          match.start_time,
          match.phase,
          match.status,
        ]
      );
    }

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database", err);
  } finally {
    await client.end();
  }
};

seedDatabase();
