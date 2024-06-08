import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Page() {
    return (
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Iniciar sesión</h1>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Correo</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Correo electrónico"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Contraseña</Label>
                    </div>
                    <Input id="password" type="password" placeholder="Contraseña" required />
                </div>
                <Button type="submit" className="w-full">
                    Ingresar
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                ¿No tenés cuenta?{" "}
                <Link href="/register" className="underline">
                    Registrate
                </Link>
            </div>
        </div>
    )
}
