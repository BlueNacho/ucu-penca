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
    group: string;
    phase: string;
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

export type Carrer = {
    id: number;
    name: string;
};