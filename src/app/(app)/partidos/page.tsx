import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import Image from "next/image";
import { getMatchesDisplayed } from "@/data/matches";
import { MatchDisplayed, User } from "@/types/types";
import { formatDateToLocal } from "@/lib/utils";
import { getSession } from "@/lib/auth-utils";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import DrawerMatch from "@/components/drawer-match";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardMatch } from "@/components/card-match";

export default async function Page() {

    const session = await getSession();
    const isAdmin = session.user?.is_admin
    const matches: MatchDisplayed[] = await getMatchesDisplayed(session.user?.id);

    const finishedMatches = [...matches].filter(match => match.status === "finalizado");
    const pendingMatches = [...matches].filter(match => match.status === "pendiente");
    const playingMatches = [...matches].filter(match => match.status === "jugándose");

    return (
        <div className="w-full h-full">
            <Tabs defaultValue="pendiente" className="w-full flex flex-col h-full">
                <div className="flex flex-col md:flex-row justify-center items-center w-full mb-2 gap-2 md:gap-6">
                    <TabsList className="w-max ">
                        <TabsTrigger value="pendiente">Próximos</TabsTrigger>
                        <TabsTrigger value="jugándose">Jugándose</TabsTrigger>
                        <TabsTrigger value="finalizado">Finalizados</TabsTrigger>
                    </TabsList>

                    {isAdmin &&
                        <Link href={`/admin/partidos/crear`}>
                            <Button className="w-[290px] text-white bg-primary/20">
                                <SquarePlus size={20} />
                                &nbsp;
                                Crear Partido
                            </Button>
                        </Link>
                    }
                </div>

                <TabsContent value="pendiente" className="text-center pb-4">
                    {pendingMatches.length === 0 && <p className="italic text-foreground/30">No hay partidos pendientes por el momento</p>}
                    <div className="flex flex-col max-h-full gap-6 md:grid md:grid-cols-2">
                        {pendingMatches.map((match, index) => (
                            <Link href={isAdmin ? `/admin/partidos/${match.id}/editar` : `#`} key={index}>
                                <DrawerMatch match={match} isAdmin={isAdmin} status={match.status}>
                                    <CardMatch match={match} isAdmin={isAdmin} />
                                </DrawerMatch>
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="jugándose" className="text-center pb-4">
                    {playingMatches.length === 0 && <p className="italic text-foreground/30">No hay partidos jugándose por el momento</p>}
                    <div className="flex flex-col max-h-full gap-6 md:grid md:grid-cols-2">
                        {playingMatches.map((match, index) => (
                            <Link href={isAdmin ? `/admin/partidos/${match.id}/editar` : `#`} key={index}>
                                <DrawerMatch match={match} isAdmin={isAdmin} status={match.status}>
                                    <CardMatch match={match} isAdmin={isAdmin} />
                                </DrawerMatch>
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="finalizado" className="text-center pb-4">
                    {finishedMatches.length === 0 && <p className="italic text-foreground/30">No hay partidos finalizados por el momento</p>}
                    <div className="flex flex-col max-h-full gap-6 md:grid md:grid-cols-2">
                        {finishedMatches.map((match, index) => (
                            <Link href={isAdmin ? `/admin/partidos/${match.id}/editar` : `#`} key={index}>
                                <DrawerMatch match={match} isAdmin={isAdmin} status={match.status}>
                                    <CardMatch match={match} isAdmin={isAdmin} />
                                </DrawerMatch>
                            </Link>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}