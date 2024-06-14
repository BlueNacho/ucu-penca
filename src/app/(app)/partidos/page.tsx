import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import Image from "next/image";
import { fetchMatchesDisplayed } from "@/data/matches";
import { MatchDisplayed } from "@/types/types";
import { formatDateToLocal } from "@/lib/utils";

export default async function Page() {

    const matches: MatchDisplayed[] = await fetchMatchesDisplayed();

    return (
        <div className="flex flex-col max-h-full gap-6 md:grid md:grid-cols-2">
            {matches.map((match, index) => (
                <Card key={index} className="h-max">
                    <CardContent className="py-3 px-8 flex flex-row justify-between items-center">
                        <div className="flex flex-col items-center justify-center w-1/3">
                            <div className="flex flex-col items-center gap-1">
                                    <Image src={`https://flagcdn.com/${match.home_team_code}.svg`}
                                        alt="Team Image"
                                        width={1920}
                                        height={1080}
                                        priority
                                        className="object-cover object-center rounded-lg w-16 h-12 shadow-md"
                                    />
                                <span className="font-medium text-lg">{match.home_team_name}</span>
                            </div>
                        </div>
                        <span className="text-4xl font-black bg-clip-text text-transparent text-center bg-gradient-to-tr from-blue-600 to-blue-400 w-1/3">VS</span>

                        <div className="flex flex-col items-center justify-center w-1/3">
                            <div className="flex flex-col items-center gap-1">
                                <Image src={`https://flagcdn.com/${match.away_team_code}.svg`}
                                    alt="Team Image"
                                    width={1920}
                                    height={1080}
                                    priority
                                    className="object-cover object-center rounded-lg w-16 h-12 shadow-md"
                                />
                                <span className="font-medium text-lg">{match.away_team_name}</span>
                            </div>
                        </div>
                    </CardContent>
                    

                    <CardFooter className="border-t px-4 py-1 flex flex-row justify-between text-sm font-semibold rounded-b-md bg-blue-500/20">
                        <span>{formatDateToLocal(match.start_time)}hs</span>
                        <span className="uppercase">{match.phase}</span>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}