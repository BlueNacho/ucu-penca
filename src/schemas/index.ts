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