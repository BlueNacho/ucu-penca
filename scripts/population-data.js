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
    champion_team_id: null,
    runner_up_team_id: null,
    is_admin: true,
  },
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    career: 4,
    champion_team_id: 1,
    runner_up_team_id: 2,
    is_admin: false,
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "mypassword",
    career: 1,
    champion_team_id: 2,
    runner_up_team_id: 3,
    is_admin: false,
  },
  {
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    password: "alicepassword",
    career: 3,
    champion_team_id: 3,
    runner_up_team_id: 4,
    is_admin: false,
  },
];

const matches = [
  // Fase de grupos
  // Fecha 1
  {
    home_team_id: 1,
    away_team_id: 4,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-20T21:00:00",
    phase: "Fecha 1",
    group_name: "A",
    status: "pendiente",
  },
  {
    home_team_id: 2,
    away_team_id: 3,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-21T21:00:00",
    phase: "Fecha 1",
    group_name: "A",
    status: "pendiente",
  },
  {
    home_team_id: 6,
    away_team_id: 7,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-22T19:00:00",
    phase: "Fecha 1",
    group_name: "B",
    status: "pendiente",
  },
  {
    home_team_id: 5,
    away_team_id: 8,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-22T22:00:00",
    phase: "Fecha 1",
    group_name: "B",
    status: "pendiente",
  },
  {
    home_team_id: 9,
    away_team_id: 12,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-23T19:00:00",
    phase: "Fecha 1",
    group_name: "C",
    status: "pendiente",
  },
  {
    home_team_id: 10,
    away_team_id: 11,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-23T22:00:00",
    phase: "Fecha 1",
    group_name: "C",
    status: "pendiente",
  },
  {
    home_team_id: 14,
    away_team_id: 15,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-24T19:00:00",
    phase: "Fecha 1",
    group_name: "D",
    status: "pendiente",
  },
  {
    home_team_id: 13,
    away_team_id: 16,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-24T22:00:00",
    phase: "Fecha 1",
    group_name: "D",
    status: "pendiente",
  },

  // Fecha 2
  {
    home_team_id: 2,
    away_team_id: 4,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-25T19:00:00",
    phase: "Fecha 2",
    group_name: "A",
    status: "pendiente",
  },
  {
    home_team_id: 3,
    away_team_id: 1,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-25T22:00:00",
    phase: "Fecha 2",
    group_name: "A",
    status: "pendiente",
  },
  {
    home_team_id: 6,
    away_team_id: 8,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-26T19:00:00",
    phase: "Fecha 2",
    group_name: "B",
    status: "pendiente",
  },
  {
    home_team_id: 7,
    away_team_id: 5,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-26T22:00:00",
    phase: "Fecha 2",
    group_name: "B",
    status: "pendiente",
  },
  {
    home_team_id: 11,
    away_team_id: 9,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-27T19:00:00",
    phase: "Fecha 2",
    group_name: "C",
    status: "pendiente",
  },
  {
    home_team_id: 10,
    away_team_id: 12,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-27T22:00:00",
    phase: "Fecha 2",
    group_name: "C",
    status: "pendiente",
  },
  {
    home_team_id: 14,
    away_team_id: 16,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-28T19:00:00",
    phase: "Fecha 2",
    group_name: "D",
    status: "pendiente",
  },
  {
    home_team_id: 15,
    away_team_id: 13,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-28T22:00:00",
    phase: "Fecha 2",
    group_name: "D",
    status: "pendiente",
  },

  // Fecha 3
  {
    home_team_id: 1,
    away_team_id: 2,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-29T21:00:00",
    phase: "Fecha 3",
    group_name: "A",
    status: "pendiente",
  },
  {
    home_team_id: 4,
    away_team_id: 3,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-29T21:00:00",
    phase: "Fecha 3",
    group_name: "A",
    status: "pendiente",
  },
  {
    home_team_id: 5,
    away_team_id: 6,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-30T21:00:00",
    phase: "Fecha 3",
    group_name: "B",
    status: "pendiente",
  },
  {
    home_team_id: 8,
    away_team_id: 7,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-06-30T21:00:00",
    phase: "Fecha 3",
    group_name: "B",
    status: "pendiente",
  },
  {
    home_team_id: 12,
    away_team_id: 11,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-07-01T22:00:00",
    phase: "Fecha 3",
    group_name: "C",
    status: "pendiente",
  },
  {
    home_team_id: 9,
    away_team_id: 10,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-07-01T22:00:00",
    phase: "Fecha 3",
    group_name: "C",
    status: "pendiente",
  },
  {
    home_team_id: 13,
    away_team_id: 14,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-07-02T22:00:00",
    phase: "Fecha 3",
    group_name: "D",
    status: "pendiente",
  },
  {
    home_team_id: 16,
    away_team_id: 15,
    home_team_goals: 0,
    away_team_goals: 0,
    start_time: "2024-07-02T22:00:00",
    phase: "Fecha 3",
    group_name: "D",
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
