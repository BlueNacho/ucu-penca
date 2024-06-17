import { logout } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default function Page() {
    return (
        <div className="grid grid-cols-2">
            <form action={async () => {
                'use server';
                await logout();
                return redirect('/');
            }}>
                <button className="bg-destructive p-2 rounded-sm">Cerrar sesion</button>
            </form>
        </div>
    );
}