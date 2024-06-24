'use client';
import Logo from "./logo";
import Link from "next/link";
import { CalendarDays, ShieldHalf, Trophy, User } from "lucide-react";
import { getSession } from "@/lib/auth-utils";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navlinks = [
    { href: "/partidos", label: "Partidos", icon: ShieldHalf },
    { href: "/fixture", label: "Fixture", icon: CalendarDays },
    { href: "/ranking", label: "Ranking", icon: Trophy },
]

export default function Navbar({name} : {name: string}) {
    const pathname = usePathname();

    return (
        <>
            <nav className="flex flex-col lg:flex-row w-full border-b bg-background">
                <div className="flex justify-center items-center lg:justify-start w-full lg:w-[60%] xl:w-[50%] lg:max-w-6xl lg:mx-auto py-2">
                    <Link href="/partidos">
                        <Logo />
                    </Link>
                    <div className="pl-8 flex-row gap-5 flex-grow h-full items-center hidden lg:flex font-medium text-lg">
                        {navlinks.map((link) => {
                            const LinkIcon = link.icon;
                            return (
                                <Link href={link.href} key={link.href} className={clsx("group hover:text-primary transition-all flex flex-row gap-2 items-center",
                                    pathname === link.href && "text-primary"
                                )}>
                                    <LinkIcon size={20} />
                                    {link.label}
                                </Link>
                            )

                        })}

                        <Link href="/perfil" className="ml-auto flex items-center group bg-primary/10 hover:bg-primary/50 transition-all rounded-lg border">
                            <span className="hidden transition-all xl:block px-3 text-sm">{name}</span>
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