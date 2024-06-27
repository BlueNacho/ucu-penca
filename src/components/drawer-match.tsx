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
                        <PredictionForm match={match} />
                    </div>
                </DrawerContent>
            }
        </Drawer>

    )
}