'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { LogIn } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateMatchSchema } from "@/schemas";
import SelectCountry from "../select-country";
import { updateMatch } from "@/actions/matches";
import { MatchDisplayed, Team } from "@/types/types";
import { z } from "zod";

export default function UpdateMatchForm({ matchId, match, teams }: { matchId: string, match: MatchDisplayed, teams: Team[] }) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof UpdateMatchSchema>>({
        resolver: zodResolver(UpdateMatchSchema),
        defaultValues: {
            away_team_goals: 0,
            away_team_id: "",
            group_name: "",
            home_team_goals: 0,
            home_team_id: "",
            phase: "",
            start_time: new Date(Date.now()),
            status: "pendiente",
        }
    });

    const onSubmit = (values: z.infer<typeof UpdateMatchSchema>): void => {
        setError("");
        setSuccess("");

        startTransition(() => {
            updateMatch(matchId, values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);

                    if (data.success) {
                        // form.reset();
                    }
                });
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="flex flex-row items-center justify-center">

                    <FormField
                        control={form.control}
                        name="home_team_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <SelectCountry field={field} teams={teams} defaultValue={match.home_team_id.toString()}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <span className="text-primary font-bold">vs</span>

                    <FormField
                        control={form.control}
                        name="away_team_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>

                                    <SelectCountry field={field} teams={teams} defaultValue={match.away_team_id.toString()} />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                </div>
                <Button type="submit" className="w-full text-white" disabled={isPending}>
                    Crear cuenta&nbsp;<LogIn size={20} />
                </Button>
            </form>
        </Form>

    );
}