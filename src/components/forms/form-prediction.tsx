'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PredictionSchema } from "@/schemas";
import { MatchDisplayed } from "@/types/types";
import { z } from "zod";

import {
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import Image from "next/image";
import { Vote } from "lucide-react";
import setPrediction from "@/actions/predictions";

export default function PredictionForm({ match }: { match: MatchDisplayed }) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof PredictionSchema>>({
        resolver: zodResolver(PredictionSchema),
        defaultValues: {
            away_team_goals: match.prediction_away_team_goals ,
            home_team_goals: match.prediction_home_team_goals ,
        }
    });

    const onSubmit = (values: z.infer<typeof PredictionSchema>): void => {
        setError("");
        setSuccess("");

        startTransition(() => {
            setPrediction(match.id, values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    }

    return (
        <Form {...form}>
            <form>
                <DrawerHeader>
                    <DrawerTitle>Tu predicción</DrawerTitle>
                    <DrawerDescription>{match.prediction_away_team_goals !== null ? "Actualiza" : "Ingresa"} tu predicción para <span className="font-medium text-primary">{match.home_team_name} vs {match.away_team_name}</span></DrawerDescription>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </DrawerHeader>
                <div className="w-full">
                    
                    <div className="mx-4 py-5 border flex bg-primary/5 items-center justify-center gap-2 rounded-lg">
                        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
                            <div className="flex flex-col items-center gap-1">
                                <Image src={`https://flagcdn.com/${match.home_team_code}.svg`}
                                    alt="Team Image"
                                    width={1920}
                                    height={1080}
                                    priority
                                    className="object-cover object-center rounded-lg w-16 h-12 shadow-md"
                                />
                                <span className="font-semibold tracking-wide text-sm lg:text-md text-nowrap">{match.home_team_name}</span>
                            </div>
                            <FormField
                                control={form.control}
                                name="home_team_goals"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="text-center w-32 text-[17px]"
                                                placeholder="0"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <span className="text-4xl pb-16 lg:text-5xl lg:pb-3 font-black bg-clip-text text-transparent rounded-xl text-center bg-gradient-to-tr from-blue-600 to-blue-400">VS</span>

                        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
                            <div className="flex flex-col items-center gap-1">
                                <Image src={`https://flagcdn.com/${match.away_team_code}.svg`}
                                    alt="Team Image"
                                    width={1920}
                                    height={1080}
                                    priority
                                    className="object-cover object-center rounded-lg w-16 h-12 shadow-md"
                                />
                                <span className="font-semibold tracking-wide text-sm lg:text-md text-nowrap">{match.away_team_name}</span>
                            </div>
                            <FormField
                                control={form.control}
                                name="away_team_goals"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="text-center w-32 text-[17px]"
                                                placeholder="0"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <DrawerFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} className="text-white" type="submit" disabled={isPending}>
                        <Vote size={20} />
                        &nbsp;{match.prediction_away_team_goals !== null ? "Actualizar" : "Ingresar"} predicción</Button>
                </DrawerFooter>
            </form>
        </Form>
    );
}