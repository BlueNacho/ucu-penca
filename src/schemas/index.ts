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
    group_name: z.string().optional()
        .refine(value => value === "" || ["A", "B", "C", "D"].includes(value || ""), {
            message: "Nombre del grupo inválido",
        }),
    status: z.enum(["pendiente", "jugándose", "finalizado"]),
    champion: z.string().optional(),
    runnerUp: z.string().optional(),
}).refine((data) => data.home_team_id !== data.away_team_id, {
    message: "El equipo local y el visitante no pueden ser iguales",
    path: ["away_team_id"],
}).superRefine((data, ctx) => {
    if (data.phase === "6" && data.status === "finalizado") {
        if (!data.champion) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campeón es requerido cuando la fase es Final y el estado es finalizado",
                path: ["champion"],
            });
        }
        if (!data.runnerUp) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Sub-campeón es requerido cuando la fase es Final y el estado es finalizado",
                path: ["runnerUp"],
            });
        }
        if (data.champion && data.runnerUp && data.champion === data.runnerUp) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campeón y Sub-campeón no pueden ser iguales",
                path: ["runnerUp"],
            });
        }
    }
});

export const CreateMatchSchema = z.object({
    home_team_id: z.string(),
    away_team_id: z.string(),
    start_time: z.date(),
    phase: z.string().min(1, "Fase inválida"),
    group_name: z.string().optional()
        .refine(value => value === "" || ["A", "B", "C", "D"].includes(value || ""), {
            message: "Nombre del grupo inválido",
        }),
    status: z.enum(["pendiente"]),
}).refine((data) => data.home_team_id !== data.away_team_id, {
    message: "El equipo local y el visitante no pueden ser iguales",
    path: ["away_team_id"],
});  

export const PredictionSchema = z.object({
    home_team_goals: z.number(
        {
            message: "Inválido",
        }
    ).min(0, "Goles del equipo local inválidos"),
    away_team_goals: z.number(
        {
            message: "Inválido",
        }
    ).min(0, "Goles del equipo visitante inválidos"),
});

