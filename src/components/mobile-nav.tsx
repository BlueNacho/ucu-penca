'use client';
import { getSession } from "@/lib/auth-utils";
import clsx from "clsx";
import { CalendarDays, CircleUser, ShieldHalf, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav({ name }: { name: string}) {

    const pathname = usePathname();

    const navlinks = [
        { href: "/partidos", label: "Partidos", icon: ShieldHalf },
        { href: "/fixture", label: "Fixture", icon: CalendarDays },
        { href: "/ranking", label: "Ranking", icon: Trophy },
        { href: "/perfil", label: name, icon: CircleUser },
    ]

    return (
        <nav className="lg:hidden h-14 w-full border-b bg-blue-500/20 dark:bg-blue-500/10 p-3">
            <div className="h-full w-full sm:w-[80%] md:w-[65%] sm:mx-auto flex flex-row items-center justify-around md:justify-between gap-12">
                {navlinks.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                        <Link href={link.href} key={link.href} className={clsx("group hover:text-primary transition-all flex flex-col items-center",
                            pathname === link.href && "text-primary"
                        )}>
                            <LinkIcon />
                            <span className="text-xs">{link.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
}