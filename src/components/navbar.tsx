import Logo from "./logo";
import Link from "next/link";
import { ShieldHalf, Trophy, User } from "lucide-react";

const navlinks = [
    { href: "/partidos", label: "Partidos", icon: Trophy},
    { href: "/fixture", label: "Fixture", icon: Trophy},
    { href: "/perfil", label: "Perfil", icon: User}
]

export default function Navbar() {
    return (
        <>
            <header className="flex flex-col lg:flex-row w-full border-b bg-background">
                <div className="flex justify-center items-center lg:justify-start w-full lg:w-[60%] xl:w-[50%] lg:max-w-6xl lg:mx-auto py-2">
                    <Logo />
                    <div className="pl-8 flex-row gap-5 flex-grow h-full items-center hidden lg:flex font-medium text-lg">
                        <Link href="/partidos" className="group hover:text-primary transition-all flex flex-row gap-2 items-center">
                            <ShieldHalf size={20} />
                            Partidos</Link>

                        <Link href="/fixture" className="group hover:text-primary transition-all flex flex-row gap-2 items-center">
                            <Trophy size={20} />
                            Fixture</Link>


                        <Link href="/perfil" className="ml-auto border dark:border-foreground/30 bg-muted/80 dark:bg-muted/50 p-2 rounded-full hover:bg-muted transition-all cursor-pointer">
                            <User className="text-foreground/30 dark:text-foreground" />
                        </Link>
                    </div>
                </div>
            </header>


        </>
    );
}