type MatchStatus = "pending" | "ongoing" | "finished";
type GroupName = string;

export interface MatchRaw {
    id: string;
    home_team_id: number;
    away_team_id: number;
    home_team_goals: number;
    away_team_goals: number;
    start_time: string;
    phase: string;
    status: MatchStatus;
    group_name?: GroupName;
}

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
    group_name?: GroupName;
}