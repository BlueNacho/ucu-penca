import Logo from "./logo";
import Link from "next/link";
import { CalendarDays, ShieldHalf, Trophy, User } from "lucide-react";
import { getSession } from "@/lib/auth-utils";

const navlinks = [
    { href: "/partidos", label: "Partidos", icon: Trophy },
    { href: "/fixture", label: "Fixture", icon: Trophy },
    { href: "/perfil", label: "Perfil", icon: User }
]

export default async function Navbar() {
    const session = await getSession();

    return (
        <>
            <nav className="flex flex-col lg:flex-row w-full border-b bg-background">
                <div className="flex justify-center items-center lg:justify-start w-full lg:w-[60%] xl:w-[50%] lg:max-w-6xl lg:mx-auto py-2">
                    <Link href="/partidos">
                        <Logo />
                    </Link>
                    <div className="pl-8 flex-row gap-5 flex-grow h-full items-center hidden lg:flex font-medium text-lg">
                        <Link href="/partidos" className="group hover:text-primary transition-all flex flex-row gap-2 items-center">
                            <ShieldHalf size={20} />
                            Partidos</Link>
                        <Link href="/fixture" className="group hover:text-primary transition-all flex flex-row gap-2 items-center">
                            <CalendarDays />
                            Fixture</Link>
                        <Link href="/ranking" className="group hover:text-primary transition-all flex flex-row gap-2 items-center">
                            <Trophy size={20} />
                            Ranking</Link>


                        <Link href="/perfil" className="ml-auto flex items-center group bg-primary/10 hover:bg-primary transition-all rounded-lg border">
                            <span className="hidden transition-all xl:block px-3 text-sm">{session.user?.name}</span>
                            <span className="ml-auto border dark:border-foreground/30 bg-muted/80 dark:bg-muted/50 p-2 rounded-r-lg hover:bg-muted transition-all cursor-pointer">
                                <User className="text-foreground/30 dark:text-foreground" />
                            </span>
                        </Link>


                    </div>
                </div>
            </nav >
        </>
    );
}