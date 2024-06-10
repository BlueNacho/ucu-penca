import LoginForm from "@/components/forms/login-form"
import Link from "next/link"

export default function Page() {
    return (
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Iniciar sesión</h1>
            </div>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
                ¿No tenés cuenta?{" "}
                <Link href="/register" className="underline">
                    Registrate
                </Link>
            </div>
        </div>
    )
}
