'use server';

import { signIn } from '@/lib/auth/auth';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CallbackRouteError':
                    return 'Credenciales Invalidas.';
                default:
                    return 'Algo salio mal.';
            }
        }
        throw error;
    }
}