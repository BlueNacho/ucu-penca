import { getMatchesFixture } from "@/data/matches";
import { MatchDisplayed, Team } from "@/types/types";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { formatDateToLocal } from "@/lib/utils";
import { MiniCardMatch } from "@/components/card-match";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Page() {
    const matches: MatchDisplayed[] = await getMatchesFixture();

    const groupA = [...matches].filter(match => match.group_name === "A");
    const groupB = [...matches].filter(match => match.group_name === "B");
    const groupC = [...matches].filter(match => match.group_name === "C");
    const groupD = [...matches].filter(match => match.group_name === "D");

    const quarterFinals = [...matches].filter(match => match.phase === 4);

    const semiFinals = [...matches].filter(match => match.phase === 5);

    const finals = [...matches].filter(match => match.phase === 6);

    const thirdPlaceMatch = [...matches].filter(match => match.phase === 7);

    return (
        <Carousel className="min-h-full w-full flex justify-center bg-gradient-to-tr from-primary/10 to-primary/30 rounded-xl p-2 overflow-hidden md:overflow-visible">
            <CarouselContent>
                <CarouselItem className="text-center flex flex-col gap-3">
                    <h1 className="text-3xl uppercase font-bold tracking-wide italic">Fase de grupos</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-card/30 p-2 rounded-lg border">
                            <h2 className="text-xl font-bold pb-1">Grupo A</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {groupA.map((match, index) => (
                                    <MiniCardMatch key={index} match={match} />
                                ))}
                            </div>
                        </div>

                        <div className="bg-card/30 p-2 rounded-lg border">
                            <h2 className="text-xl font-bold pb-1">Grupo B</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {groupB.map((match, index) => (
                                    <MiniCardMatch key={index} match={match} />
                                ))}
                            </div>
                        </div>

                        <div className="bg-card/30 p-2 rounded-lg border">
                            <h2 className="text-xl font-bold pb-1">Grupo C</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {groupC.map((match, index) => (
                                    <MiniCardMatch key={index} match={match} />
                                ))}
                            </div>
                        </div>

                        <div className="bg-card/30 p-2 rounded-lg border">
                            <h2 className="text-xl font-bold pb-1">Grupo D</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {groupD.map((match, index) => (
                                    <MiniCardMatch key={index} match={match} />
                                ))}
                            </div>
                        </div>
                    </div>
                </CarouselItem>
                {quarterFinals.length > 0 &&
                    <CarouselItem className="text-center flex flex-col gap-3">
                        <h1 className="text-3xl uppercase font-bold tracking-wide italic">Cuartos</h1>
                        <div className="grid grid-cols-1 gap-4 w-[200px] mx-auto">
                            <div className="bg-card/30 p-2 rounded-lg border">
                                <div className="grid grid-cols-1 gap-2">
                                    {quarterFinals.map((match, index) => (
                                        <MiniCardMatch key={index} match={match} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                }

                {semiFinals.length > 0 &&
                    <CarouselItem className="text-center flex flex-col gap-3">
                        <h1 className="text-3xl uppercase font-bold tracking-wide italic">Semifinales</h1>
                        <div className="grid grid-cols-1 gap-4 w-[200px] mx-auto">
                            <div className="bg-card/30 p-2 rounded-lg border">
                                <div className="grid grid-cols-1 gap-2">
                                    {semiFinals.map((match, index) => (
                                        <MiniCardMatch key={index} match={match} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                }

                {thirdPlaceMatch.length > 0 &&
                    <CarouselItem className="text-center flex flex-col gap-3">
                        <h1 className="text-3xl uppercase font-bold tracking-wide italic">Tercer puesto</h1>
                        <div className="grid grid-cols-1 gap-4 w-[200px] mx-auto">
                            <div className="bg-card/30 p-2 rounded-lg border">
                                <div className="grid grid-cols-1 gap-2">
                                    {thirdPlaceMatch.map((match, index) => (
                                        <MiniCardMatch key={index} match={match} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                }

                {finals.length > 0 &&
                    <CarouselItem className="text-center flex flex-col gap-3">
                        <h1 className="text-3xl uppercase font-bold tracking-wide italic">Final</h1>
                        <div className="grid grid-cols-1 gap-4 w-[200px] mx-auto">
                            <div className="bg-card/30 p-2 rounded-lg border">
                                <div className="grid grid-cols-1 gap-2">
                                    {finals.map((match, index) => (
                                        <MiniCardMatch key={index} match={match} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    );
}