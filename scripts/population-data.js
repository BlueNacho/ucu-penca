const careers = [
  { name: "Ing. Informatica" },
  { name: "Ing. Industrial" },
  { name: "Economia" },
  { name: "Medicina" },
  { name: "Odontologia" },
];

const phases = [
  { name: "Fecha 1" },
  { name: "Fecha 2" },
  { name: "Fecha 3" },
  { name: "Cuartos de final" },
  { name: "Semifinales" },
  { name: "Final" },
  { name: "Partido por el tercer lugar" },
];

const teams = [
  { name: "Argentina", code: "ar", group_name: "A" },
  { name: "Peru", code: "pe", group_name: "A" },
  { name: "Chile", code: "cl", group_name: "A" },
  { name: "Canada", code: "ca", group_name: "A" },

  { name: "Mexico", code: "mx", group_name: "B" },
  { name: "Ecuador", code: "ec", group_name: "B" },
  { name: "Venezuela", code: "ve", group_name: "B" },
  { name: "Jamaica", code: "jm", group_name: "B" },

  { name: "Estados Unidos", code: "us", group_name: "C" },
  { name: "Uruguay", code: "uy", group_name: "C" },
  { name: "Panama", code: "pa", group_name: "C" },
  { name: "Bolivia", code: "bo", group_name: "C" },

  { name: "Brasil", code: "br", group_name: "D" },
  { name: "Colombia", code: "co", group_name: "D" },
  { name: "Paraguay", code: "py", group_name: "D" },
  { name: "Costa Rica", code: "cr", group_name: "D" },
];

const users = [
  {
    first_name: "Admin",
    last_name: "User",
    email: "admin@example.com",
    password: "securepassword",
    career: null,
    score: null,
    champion_team_id: null,
    runner_up_team_id: null,
    is_admin: true,
  },
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    career: "Ing. Informatica",
    score: 100,
    champion_team_id: 1,
    runner_up_team_id: 2,
    is_admin: false,
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "mypassword",
    career: "Medicina",
    score: 200,
    champion_team_id: 2,
    runner_up_team_id: 3,
    is_admin: false,
  },
  {
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    password: "alicepassword",
    career: "Economia",
    score: 150,
    champion_team_id: 3,
    runner_up_team_id: 4,
    is_admin: false,
  },
];

const matches = [
  {
    home_team_id: 1,
    away_team_id: 2,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-14T18:00:00",
    phase: "Fecha 1",
    status: "pendiente",
  },
  {
    home_team_id: 3,
    away_team_id: 4,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-15T18:00:00",
    phase: "Fecha 1",
    status: "pendiente",
  },
  {
    home_team_id: 1,
    away_team_id: 3,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-01-16T18:00:00",
    phase: "Fecha 1",
    status: "pendiente",
  },
  {
    home_team_id: 2,
    away_team_id: 4,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-17T18:00:00",
    phase: "Fecha 1",
    status: "pendiente",
  },
];

module.exports = {
  careers,
  phases,
  teams,
  users,
  matches,
};
