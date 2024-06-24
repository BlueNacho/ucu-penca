'use client'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { MatchDisplayed, MatchStatus } from "@/types/types"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import PredictionForm from "./forms/form-prediction"


export default function DrawerMatch({ children, match, isAdmin, status }: { children: React.ReactNode, match: MatchDisplayed, isAdmin: boolean, status: MatchStatus }) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            {!isAdmin && status === "pendiente" &&
                <DrawerContent className="h-1/2 lg:h-max">
                    <div className="mx-auto w-full max-w-lg h-full flex flex-col justify-center py-5">
                        <Carousel>
                            <CarouselContent>
                                <CarouselItem className="py-1">
                                    <PredictionForm match={match} />
                                </CarouselItem>
                                <CarouselItem>
                                    <DrawerHeader>
                                        <DrawerTitle>Estadísticas</DrawerTitle>
                                        <DrawerDescription>Basadas en 123 pronósticos para este partido</DrawerDescription>
                                    </DrawerHeader>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </DrawerContent>
            }
        </Drawer>

    )
}