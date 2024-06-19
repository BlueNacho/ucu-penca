import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email("Correo inválido"),
    password: z.string().min(1, "Contraseña inválida"),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, "Nombre inválido"),
    lastname: z.string().min(1, "Apellido inválido"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "Minimo 6 caracteres").max(20, "Máximo 20 caracteres"),
    career: z.string(),
    champion: z.string(),
    runnerUp: z.string(),
}).refine((data) => data.champion !== data.runnerUp, {
    message: "Campeón y Sub-campeón no pueden ser iguales",
    path: ["runnerUp"],
});

export const UpdateMatchSchema = z.object({
    home_team_id: z.string(),
    away_team_id: z.string(),
    home_team_goals: z.number().min(0, "Goles del equipo local inválidos"),
    away_team_goals: z.number().min(0, "Goles del equipo visitante inválidos"),
    start_time: z.date(),
    phase: z.string().min(1, "Fase inválida"),
    group_name: z.string().min(1, "Nombre de grupo inválido"),
    status: z.enum(["pendiente", "jugándose", "finalizado"]),
}).refine((data) => data.home_team_id !== data.away_team_id, {
    message: "El equipo local y el visitante no pueden ser iguales",
    path: ["away_team_id"],
});

