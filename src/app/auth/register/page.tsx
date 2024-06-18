import Link from "next/link"

import RegisterForm from "@/components/forms/register-form"
import { getTeams } from "@/data/teams";
import { getCareers } from "@/data/careers";

export default async function Page() {
    const teams = await getTeams();
    const careers = await getCareers();

    return (
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Registrarse</h1>
            </div>
            <RegisterForm teams={teams} careers={careers} />
            <div className="mt-4 text-center text-sm">
                ¿Ya tenés cuenta?{" "}
                <Link href="/auth/login" className="underline">
                    Inicia sesión
                </Link>
            </div>
        </div>
    )
}
