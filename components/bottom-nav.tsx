
import { CalendarDays, CircleUser, ShieldHalf } from "lucide-react";
import Link from "next/link";

export default function BottomNav() {
    return (
        <footer className="lg:hidden h-14 w-full border-b bg-blue-500/20 dark:bg-blue-500/10 p-3">
            <div className="h-full w-full sm:w-[80%] md:w-[65%] sm:mx-auto flex flex-row items-center justify-around md:justify-between gap-12">
                <Link href="/partidos" className="flex flex-col justify-center items-center text-primary">
                    <ShieldHalf />
                    <span className="text-xs">Partidos</span>
                </Link>
                <Link href="/partidos" className="flex flex-col justify-center items-center">
                    <CalendarDays />
                    <span className="text-xs">Fixture</span>
                </Link>
                <Link href="/partidos" className="flex flex-col justify-center items-center">
                    <CircleUser />
                    <span className="text-xs">Perfil</span>
                </Link>
            </div>
        </footer>
    );
}