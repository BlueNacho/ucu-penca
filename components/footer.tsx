
import { CalendarDays, CircleUser, ShieldHalf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="lg:hidden w-full border-t-[0.2px] bg-background absolute bottom-0 p-3">
            <div className="h-full w-full flex flex-row justify-around gap-12">
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