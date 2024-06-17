import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getAdminMatchById } from "@/data/matches";
import { formatDateToLocal } from "@/lib/utils";
import Image from "next/image";


export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const match = await getAdminMatchById(id)

    return (
        <Card className="h-full transition-all group relative">
            

            {/* <CardHeader className="py-3 px-8 flex flex-row justify-between items-center">
                <div className="flex flex-col items-center justify-center w-1/3">
                    <div className="flex flex-col items-center gap-1">
                        <Image src={`https://flagcdn.com/${match.home_team_code}.svg`}
                            alt="Team Image"
                            width={1920}
                            height={1080}
                            priority
                            className="object-cover object-center rounded-lg w-16 h-12 shadow-md"
                        />
                        <span className="font-medium text-sm lg:text-lg text-nowrap">{match.home_team_name}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center w-1/3 gap-1">
                    <span className="text-4xl font-black bg-clip-text text-transparent rounded-xl text-center bg-gradient-to-tr from-blue-600 to-blue-400">VS</span>
                </div>

                <div className="flex flex-col items-center justify-center w-1/3">
                    <div className="flex flex-col items-center gap-1">
                        <Image src={`https://flagcdn.com/${match.away_team_code}.svg`}
                            alt="Team Image"
                            width={1920}
                            height={1080}
                            priority
                            className="object-cover object-center rounded-lg w-16 h-12 shadow-md"
                        />
                        <span className="font-medium text-sm lg:text-lg text-nowrap">{match.away_team_name}</span>
                    </div>
                </div>
            </CardHeader>

            <span className="px-4 py-1 flex flex-row justify-between text-sm font-semibold bg-primary/20">
                <span>{formatDateToLocal(match.start_time)}hs</span>

                <div className="text-nowrap">
                    <span className="uppercase">GRUPO {match["group_name"]}</span>
                    <span>&nbsp; - &nbsp;</span>
                    <span className="uppercase">{match.phase}</span>
                </div>
            </span>

            <CardContent className="flex flex-row justify-between items-center px-4 py-2">
                <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold text-lg">Goles</span>
                    <span className="text-sm">Local: {match.home_team_goals}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold text-lg">Goles</span>
                    <span className="text-sm">Visitante: {match.away_team_goals}</span>
                </div>
            </CardContent> */}
        </Card>
    );
}