

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions/actions';
import { LogIn, OctagonAlert } from "lucide-react";
import { signIn } from "@/lib/auth/auth";

export default function LoginForm() {
    // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form
            action={async (formData) => {
                "use server"
                await signIn("credentials", formData)
            }}
        >
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Correo</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Contraseña</Label>
                    </div>
                    <Input id="password" type="password" name="password" placeholder="Contraseña" required />
                </div>
                {/* <LoginButton /> */}
                <Button type="submit" color="primary" className="w-full">
                    Ingresar&nbsp;<LogIn size={20} />
                </Button>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {/* {errorMessage && (
                        <>
                            <OctagonAlert className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )} */}
                </div>
            </div>
        </form>
    )
}

// function LoginButton() {
//     const { pending } = useFormStatus();

//     return (
//         <Button type="submit" color="primary" className="w-full" disabled={pending}>
//             Ingresar&nbsp;<LogIn size={20} />
//         </Button>
//     );
// }