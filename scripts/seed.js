const { Client } = require("pg");
const bcrypt = require("bcrypt");
const data = require("./population-data");

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

const seedDatabase = async () => {
  try {
    await client.connect();

    // Habilitar la extensión uuid-ossp
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    //Tablas del sistema
    await client.query(`
      CREATE TABLE IF NOT EXISTS careers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS phases (
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
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(4) NOT NULL,
        group_name group_name NOT NULL,
        champion BOOLEAN DEFAULT FALSE,
        runner_up BOOLEAN DEFAULT FALSE
      );
    `);

    // Crear el tipo ENUM para el estado del partido si no existe
    await client.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'match_status') THEN
              CREATE TYPE match_status AS ENUM ('pendiente', 'jugándose', 'finalizado');
          END IF;
      END$$;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS matches (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        home_team_id INT NOT NULL,
        away_team_id INT NOT NULL,
        home_team_goals INT DEFAULT 0,
        away_team_goals INT DEFAULT 0,
        start_time TIMESTAMP NOT NULL,
        phase INT NOT NULL,
        group_name group_name,
        status match_status NOT NULL,
        FOREIGN KEY (home_team_id) REFERENCES teams(id),
        FOREIGN KEY (away_team_id) REFERENCES teams(id),
        FOREIGN KEY (phase) REFERENCES phases(id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users
        (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name TEXT NOT NULL,
          lastname TEXT NOT NULL,
          email VARCHAR(255),
          password TEXT,
          score INT DEFAULT 0,
          career_id INT,
          champion_team_id INT,
          runner_up_team_id INT,
          is_admin BOOLEAN DEFAULT FALSE,
          
          FOREIGN KEY (career_id) REFERENCES careers(id),
          FOREIGN KEY (champion_team_id) REFERENCES teams(id),
          FOREIGN KEY (runner_up_team_id) REFERENCES teams(id)
        );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS predictions (
        match_id UUID NOT NULL,
        user_id UUID NOT NULL, 
        home_team_goals INT DEFAULT 0,
        away_team_goals INT DEFAULT 0,
        score INT DEFAULT 0,
        PRIMARY KEY (match_id, user_id),
        FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Insertar careers
    for (const career of data.careers) {
      await client.query(
        "INSERT INTO careers (name) VALUES ($1) ON CONFLICT DO NOTHING",
        [career.name]
      );
    }

    // Insertar phases
    for (const phase of data.phases) {
      await client.query(
        "INSERT INTO phases (name) VALUES ($1) ON CONFLICT DO NOTHING",
        [phase.name]
      );
    }

    // Insertar teams
    for (const team of data.teams) {
      await client.query(
        "INSERT INTO teams (name, code, group_name) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
        [team.name, team.code, team.group_name]
      );
    }

    // Encriptar passwords e insertar users

    for (const user of data.users) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // 10 salt rounds
      await client.query(
        "INSERT INTO users (name, lastname, email, password, career_id, champion_team_id, runner_up_team_id, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          user.first_name,
          user.last_name,
          user.email,
          hashedPassword,
          user.career,
          user.champion_team_id,
          user.runner_up_team_id,
          user.is_admin,
        ]
      );
    }

    // Insertar matches
    for (const match of data.matches) {
      await client.query(
        "INSERT INTO matches (home_team_id, away_team_id, home_team_goals, away_team_goals, start_time, phase, group_name, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          match.home_team_id,
          match.away_team_id,
          match.home_team_goals,
          match.away_team_goals,
          match.start_time,
          match.phase,
          match.group_name,
          match.status,
        ]
      );
    }

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database", err);
  } finally {
    await client.end();
  }
};

seedDatabase();
