import { ModeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSession, logout } from "@/lib/auth-utils";
import { LogOut } from "lucide-react";
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

function parseInitials(name: string, lastname: string) {
    const nameInitial = name ? name[0].toUpperCase() : '';
    const lastnameInitial = lastname ? lastname[0].toUpperCase() : '';
    return `${nameInitial}${lastnameInitial}`;
}

export default async function Page() {
    const session = await getSession();
    const user = session.user;
    const isAdmin = session.user?.is_admin
    const career = await getCareerById(user.career_id);
    const userInitials = parseInitials(user.name, user.lastname);



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
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                <div className="flex flex-row items-center gap-2">
                                    <div className="text-xs text-primary-foreground dark:text-white rounded-full w-max px-3 font-medium bg-primary">{career.name}</div>
                                    {isAdmin && <div className="text-xs text-primary-foreground dark:text-white rounded-full w-max px-3 font-medium bg-amber-600">Admin</div>}
                                </div>
                            </div>
                            <div className="flex gap-2">
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
                                            <form action={async () => {
                                                'use server';
                                                await logout();
                                                return redirect('/');
                                            }}>
                                                <AlertDialogAction className="text-white" type="submit">Confirmar</AlertDialogAction>
                                            </form>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>




                            </div>
                        </div>
                    </div>
                </div>
                <Separator className="my-8" />
                <div className="grid gap-8">
                    <div>
                        <h2 className="text-lg font-semibold">Recent Activity</h2>
                        <div className="grid gap-4 mt-4">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>JP</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 grid gap-1">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">Jared Palmer</div>
                                        <time className="text-xs text-muted-foreground">2 days ago</time>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Shared a new blog post: "Building a Scalable React\n Application"
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>JP</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 grid gap-1">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">Jared Palmer</div>
                                        <time className="text-xs text-muted-foreground">1 week ago</time>
                                    </div>
                                    <div className="text-sm text-muted-foreground">Commented on the "Vercel Deployment" thread</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>JP</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 grid gap-1">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">Jared Palmer</div>
                                        <time className="text-xs text-muted-foreground">3 weeks ago</time>
                                    </div>
                                    <div className="text-sm text-muted-foreground">Liked the "Tailwind CSS Best Practices" post</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}