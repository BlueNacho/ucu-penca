import { getRankAndScoreById, getScoreboard } from "@/data/users";
import { User } from "@/types/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card";
import { getSession } from "@/lib/auth-utils";
import clsx from "clsx";


export default async function Page() {
    const session = await getSession()
    const isAdmin = session.user?.is_admin
    const scoreboard: User[] = await getScoreboard()
    let rank = { rank: 0, score: 0 };

    if (!isAdmin) {
        rank = await getRankAndScoreById(session.user?.id)
    }

    return (
        <div className="flex flex-col items-center justify-center pb-3">
            {!isAdmin ?
                (
                    <span className="flex w-full py-2 px-4 bg-primary rounded-t-md ">
                        <span className="font-semibold text-white">Posición {rank.rank} ({rank.score}pts)</span>
                        <span className="ml-auto font-semibold text-white">{scoreboard.length} Miembros</span>
                    </span>
                ) : (
                    <span className="flex w-full py-2 px-4 bg-primary rounded-t-md">
                        <span className="font-semibold text-white">Ranking de Usuarios</span>
                        <span className="ml-auto font-semibold text-white">{scoreboard.length} Miembros</span>
                    </span>
                )
            }
            <Card className="w-full rounded-none border-primary">
                <Table className="text-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3 text-center">Pos.</TableHead>
                            <TableHead className="w-1/3 text-center">Nombre</TableHead>
                            <TableHead className="w-1/3 text-center">Puntaje</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {scoreboard.map((user, index) => (
                            <>
                                <TableRow key={index} className={clsx(session.user?.id === user.id && "bg-primary/70")}>
                                    <TableCell className="text-center w-1/3 bg-primary/30">{index + 1}</TableCell>
                                    <TableCell className="text-center w-1/3 bg-primary/20">{user.name}</TableCell>
                                    <TableCell className="text-center w-1/3 bg-primary/10">{user.score}</TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <span className="flex w-full py-1 items-center justify-center bg-primary rounded-b-md">
            </span>
        </div>
    );
}