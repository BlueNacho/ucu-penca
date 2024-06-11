//Matches
export type MatchDisplayed = {
    id: string;
    home_team_name: string;
    home_team_code: string;
    away_team_name: string;
    away_team_code: string;
    home_team_goals: number;
    away_team_goals: number;
    start_time: string;
    phase: string;
    status: string;
};

export type User = {
    id: string;
    email: string;
    name: string;
    lastname: string;
    password: string;
    carrer: string;
    score: number;
    champion_team_id: string;
    runner_up_team_id: string;
    isAdmin: boolean;
};

export type Team = {
    id: string;
    name: string;
    code: string;
    phase: string;
    group_name: string;
    group_score: string;
};

export type Match = {
    id: string;
    date: string;
    team1_id: string;
    team2_id: string;
    team1_goals: number;
    team2_goals: number;
    group: string;
    phase: string;
};

export type Prediction = {
    user_id: string;
    match_id: string;
    team1_goals: number;
    team2_goals: number;
};

export type Phase = {
    id: string;
    name: string;
};

export type Career = {
    id: number;
    name: string;
};