
import { CalendarDays, CircleUser, ShieldHalf, Trophy } from "lucide-react";
import Link from "next/link";

export default function MobileNav() {
    return (
        <nav className="lg:hidden h-14 w-full border-b bg-blue-500/20 dark:bg-blue-500/10 p-3">
            <div className="h-full w-full sm:w-[80%] md:w-[65%] sm:mx-auto flex flex-row items-center justify-around md:justify-between gap-12">
                <Link href="/partidos" className="flex flex-col justify-center items-center text-primary">
                    <ShieldHalf />
                    <span className="text-xs">Partidos</span>
                </Link>
                <Link href="/partidos" className="flex flex-col justify-center items-center">
                    <CalendarDays />
                    <span className="text-xs">Fixture</span>
                </Link>
                <Link href="/ranking" className="flex flex-col justify-center items-center">
                    <Trophy />
                    <span className="text-xs">Ranking</span>
                </Link>
                <Link href="/perfil" className="flex flex-col justify-center items-center">
                    <CircleUser />
                    <span className="text-xs">Perfil</span>
                </Link>
            </div>
        </nav>
    );
}