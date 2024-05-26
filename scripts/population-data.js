const careers = [
  { name: "Ing. Informatica" },
  { name: "Ing. Industrial" },
  { name: "Economia" },
  { name: "Medicina" },
  { name: "Odontologia" },
];

const phases = [
  { name: "Fase de grupos" },
  { name: "Cuartos de final" },
  { name: "Semifinales" },
  { name: "Final" },
  { name: "Playoff tercer puesto" },
];

const teams = [
  { name: "Argentina", code: "ar", phase: "Fase de grupos", group_name: "A" },
  { name: "Peru", code: "pe", phase: "Fase de grupos", group_name: "A" },
  { name: "Chile", code: "cl", phase: "Fase de grupos", group_name: "A" },
  { name: "Canada", code: "ca", phase: "Fase de grupos", group_name: "A" },

  { name: "Mexico", code: "mx", phase: "Fase de grupos", group_name: "B" },
  { name: "Ecuador", code: "ec", phase: "Fase de grupos", group_name: "B" },
  { name: "Venezuela", code: "ve", phase: "Fase de grupos", group_name: "B" },
  { name: "Jamaica", code: 'jm', phase: "Fase de grupos", group_name: "B" },

  { name: "Estados Unidos", code: 'us', phase: "Fase de grupos", group_name: "C" },
  { name: "Uruguay", code: 'uy', phase: "Fase de grupos", group_name: "C" },
  { name: "Panama", code: 'pa', phase: "Fase de grupos", group_name: "C" },
  { name: "Bolivia", code: 'bo', phase: "Fase de grupos", group_name: "C" },

  { name: "Brasil", code: 'br', phase: "Fase de grupos", group_name: "D" },
  { name: "Colombia", code: 'co', phase: "Fase de grupos", group_name: "D" },
  { name: "Paraguay", code: 'py', phase: "Fase de grupos", group_name: "D" },
  { name: "Costa Rica", code: 'cr', phase: "Fase de grupos", group_name: "D" },
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
    home_team_id: 1, // Argentina
    away_team_id: 2, // Brasil
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-14T18:00:00Z",
    phase: "Fase de grupos",
    status: "pending",
  },
  {
    home_team_id: 3, // Chile
    away_team_id: 4, // Uruguay
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-15T18:00:00Z",
    phase: "Fase de grupos",
    status: "pending",
  },
  {
    home_team_id: 1, // Argentina
    away_team_id: 3, // Chile
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-16T18:00:00Z",
    phase: "Fase de grupos",
    status: "pending",
  },
  {
    home_team_id: 2, // Brasil
    away_team_id: 4, // Uruguay
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-17T18:00:00Z",
    phase: "Fase de grupos",
    status: "pending",
  },
];

module.exports = {
  careers,
  phases,
  teams,
  users,
  matches,
};
