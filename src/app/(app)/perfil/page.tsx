import { ModeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSession, logout } from "@/lib/auth-utils";
import { GraduationCap, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getCareerById } from "@/data/careers";
import { getTeamById } from "@/data/teams";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { getRankAndScoreById } from "@/data/users";
import { getPredictionsDisplayed } from "@/data/predictions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardMatch } from "@/components/card-match";

function parseInitials(name: string, lastname: string) {
    const nameInitial = name ? name[0].toUpperCase() : '';
    const lastnameInitial = lastname ? lastname[0].toUpperCase() : '';
    return `${nameInitial}${lastnameInitial}`;
}

export default async function Page() {
    const session = await getSession();
    const user = session.user;
    const isAdmin = session.user?.is_admin
    const userInitials = parseInitials(user.name, user.lastname);
    let career = undefined;
    let champion = undefined;
    let runnerUp = undefined;
    let userStats = undefined;
    let userPredictions = undefined;

    if (!isAdmin) {
        career = await getCareerById(user.career_id);
        champion = await getTeamById(user.champion_team_id);
        runnerUp = await getTeamById(user.runner_up_team_id);
        userStats = await getRankAndScoreById(user.id)
        userPredictions = await getPredictionsDisplayed(user.id);
    }

    const onLogOut = () => {
        logout();
    }

    return (
        <div className="flex flex-col justify-center gap-3 items-center w-full">
            <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-6">
                <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="text-3xl">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 grid gap-2">
                        <div className="flex items-center justify-between">
                            <div className="grid gap-1">
                                <h1 className="text-2xl font-bold">{user.name} {user.lastname}</h1>
                                <div className="text-sm text-muted-foreground -mt-2">{user.email}</div>
                                {isAdmin && <div className="text-xs text-primary-foreground dark:text-white rounded-full w-max px-3 font-medium bg-amber-600">Admin</div>}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <ModeToggle />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="icon" className="self-end"><LogOut size={20} /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Estás a punto de cerrar sesión.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <form className="w-full sm:w-max" action={async () => {
                                                'use server';
                                                await logout();
                                                return redirect('/');
                                            }}>
                                                <AlertDialogAction className="text-white w-full" type="submit">Confirmar</AlertDialogAction>
                                            </form>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator className="mt-8" />
                {!isAdmin &&
                    <>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg">Informacion adicional</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <span className="flex items-center overflow-hidden">
                                            <span className="text-muted-foreground bg-muted h-full flex items-center justify-center px-2 rounded-md rounded-r-none w-10"><GraduationCap size={20} /></span>
                                            <p className="bg-card/80 border p-1 rounded-md rounded-l-none pl-2 text-nowrap overflow-hidden overflow-ellipsis w-full">
                                                Estudiante de {career?.name}
                                            </p>
                                        </span>
                                        <span className="flex items-center overflow-hidden">
                                            <span className="text-muted-foreground bg-muted h-full flex items-center justify-center px-2 rounded-md rounded-r-none w-10">&#x1f3c6;</span>
                                            <p className="bg-card/80 border p-1 rounded-md rounded-l-none pl-2 flex items-center gap-2 text-nowrap overflow-hidden overflow-ellipsis w-full">
                                                <Image src={`https://flagcdn.com/${champion?.code}.svg`}
                                                    alt="Team Image"
                                                    width={426}
                                                    height={240}
                                                    priority
                                                    className="object-cover object-center rounded-sm w-6 h-5 shadow-md"
                                                />
                                                {champion?.name}
                                            </p>
                                        </span>
                                        <span className="flex items-center overflow-hidden">
                                            <span className="text-muted-foreground bg-muted h-full flex items-center justify-center px-2 rounded-md rounded-r-none w-10">&#x1f948;</span>
                                            <p className="bg-card/80 border p-1 rounded-md rounded-l-none pl-2 flex items-center gap-2 text-nowrap overflow-hidden overflow-ellipsis w-full">
                                                <Image src={`https://flagcdn.com/${runnerUp?.code}.svg`}
                                                    alt="Team Image"
                                                    width={426}
                                                    height={240}
                                                    priority
                                                    className="object-cover object-center rounded-sm w-6 h-5 shadow-md"
                                                />
                                                {runnerUp?.name}
                                            </p>
                                        </span>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-lg">Resumen</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <span className="flex items-center overflow-hidden">
                                            <span className="text-muted-foreground bg-muted h-full flex items-center justify-center px-2 rounded-md rounded-r-none text-nowrap">Puntos</span>
                                            <p className="bg-card/80 border p-1 rounded-md rounded-l-none pl-2 text-nowrap overflow-hidden overflow-ellipsis w-full">
                                                {userStats?.score}
                                            </p>
                                        </span>
                                        <span className="flex items-center overflow-hidden">
                                            <span className="text-muted-foreground bg-muted h-full flex items-center justify-center px-2 rounded-md rounded-r-none text-nowrap">Posición</span>
                                            <p className="bg-card/80 border p-1 rounded-md rounded-l-none pl-2 text-nowrap overflow-hidden overflow-ellipsis w-full">
                                                {userStats?.rank}
                                            </p>
                                        </span>
                                        <span className="flex items-center overflow-hidden">
                                            <span className="text-muted-foreground bg-muted h-full flex items-center justify-center px-2 rounded-md rounded-r-none text-nowrap">Predicciones</span>
                                            <p className="bg-card/80 border p-1 rounded-md rounded-l-none pl-2 text-nowrap overflow-hidden overflow-ellipsis w-full">
                                                {userPredictions && userPredictions.length}
                                            </p>
                                        </span>
                                    </div>
                                    <h1 className="text-lg mt-4">Mis predicciones</h1>
                                    <ScrollArea className="w-full h-56 mt-2 bg-primary/30 p-2 rounded-md">
                                        <div className="flex flex-col gap-2">
                                            {userPredictions?.map((prediction, index) => (
                                                <CardMatch key={index} match={prediction} isAdmin={isAdmin} />
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </>
                }
            </div>
        </div>
    );
}