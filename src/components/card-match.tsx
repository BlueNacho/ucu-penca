import { MatchDisplayed } from "@/types/types";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDateToLocal } from "@/lib/utils";
import clsx from "clsx";

export function CardMatch({ match, isAdmin }: { match: MatchDisplayed, isAdmin: boolean }) {
    return (
        <Card className="transition-all xl:hover:scale-[101%] focus:scale-[100%] group relative h-max">
            <CardContent className="py-3 px-8 flex flex-row justify-between items-center">
                <div className="flex flex-col items-center justify-center w-1/3">
                    <div className="flex flex-col items-center gap-1">
                        <Image src={`https://flagcdn.com/${match.home_team_code}.svg`}
                            alt="Team Image"
                            width={640}
                            height={360}
                            priority
                            className="object-cover object-center rounded-lg w-16 h-12 shadow-md"
                        />
                        <span className="font-semibold tracking-wide text-sm lg:text-md text-nowrap">{match.home_team_name}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center w-1/3 gap-2">
                    {match.status === "jugándose" || match.status === "finalizado" ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="text-xl font-semibold text-white px-2 rounded-sm bg-primary">{match.home_team_goals} - {match.away_team_goals}</span>
                                </TooltipTrigger>
                                <TooltipContent className="font-bold border-none bg-primary">
                                    <p>Resultado del partido</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <span className="text-4xl font-black bg-clip-text text-transparent rounded-xl text-center bg-gradient-to-tr from-blue-600 to-blue-400">VS</span>
                    )}

                    {match.prediction_away_team_goals !== null && match.prediction_home_team_goals !== null ||
                        match.status === "jugándose" || match.status === "finalizado"
                        ? (
                            <TooltipProvider >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className={clsx("text-sm font-semibold text-white bg-primary/30 px-2 rounded-sm")}>
                                            {match.prediction_home_team_goals} - {match.prediction_away_team_goals}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Tú predicción</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>


                        ) : (
                            <span className="dark:text-white p-1.5 h-max rounded-md bg-primary/20 xl:group-hover:bg-primary transition-all group-active:bg-primary text-xs">
                                {isAdmin ? "Actualizar" : "Predecir"}
                            </span>
                        )}

                </div>

                <div className="flex flex-col items-center justify-center w-1/3">
                    <div className="flex flex-col items-center gap-1">
                        <Image src={`https://flagcdn.com/${match.away_team_code}.svg`}
                            alt="Team Image"
                            width={640}
                            height={360}
                            priority
                            className="object-cover object-center rounded-lg w-16 h-12 shadow-md"
                        />
                        <span className="font-semibold tracking-wide text-sm lg:text-md text-nowrap">{match.away_team_name}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="border-t px-4 py-1 flex flex-row justify-between text-sm font-semibold rounded-b-md bg-primary/20">
                <span>{formatDateToLocal(match.start_time)}hs</span>

                <div className="text-nowrap">
                    {match.group_name &&
                        <>
                            <span className="uppercase">GRUPO {match.group_name}</span>
                            <span>&nbsp; - &nbsp;</span>
                        </>
                    }
                    <span className="uppercase">{match.phase_name}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

export function MiniCardMatch({ match, key }: { match: MatchDisplayed, key: number }) {
    return (
        <div key={key} className={clsx("border rounded-md",
            match.status === "jugándose" || match.status === "finalizado" && "border-primary",
        )}>
            <div className="flex flex-row gap-2 bg-card/70 justify-between items-center px-4 p-2 rounded-md rounded-b-none">
                <Image src={`https://flagcdn.com/${match.home_team_code}.svg`}
                    alt="Team Image"
                    width={426}
                    height={240}
                    priority
                    className="object-cover object-center rounded-sm w-6 h-5 shadow-md"
                />

                {match.status === "jugándose" || match.status === "finalizado" ? (
                    <span className="text-primary font-bold text-xs">{match.home_team_goals} - {match.away_team_goals}</span>
                ) : (
                    <span className="font-semibold text-sm">vs</span>
                )}
                <Image src={`https://flagcdn.com/${match.away_team_code}.svg`}
                    alt="Team Image"
                    width={426}
                    height={240}
                    priority
                    className="object-cover object-center rounded-sm w-6 h-5 shadow-md"
                />
            </div>
            <div className="rounded rounded-t-none bg-primary/20">
                <span className="text-xs font-semibold">
                    {formatDateToLocal(match.start_time)}hs
                </span>
            </div>
        </div>
    )
}