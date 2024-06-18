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
import { Upload } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateMatchSchema } from "@/schemas";
import SelectCountry from "../select-country";
import { updateMatch } from "@/actions/matches";
import { MatchDisplayed, Team } from "@/types/types";
import { z } from "zod";
import Image from "next/image";

export default function UpdateMatchForm({ matchId, match, teams }: { matchId: string, match: MatchDisplayed, teams: Team[] }) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof UpdateMatchSchema>>({
        resolver: zodResolver(UpdateMatchSchema),
        defaultValues: {
            away_team_goals: match.away_team_goals,
            away_team_id: match.away_team_id.toString(),
            group_name: match.group_name || undefined,
            home_team_goals: match.home_team_goals,
            home_team_id: match.home_team_id.toString(),
            phase: match.phase,
            start_time: new Date(match.start_time),
            status: match.status,
        }
    });

    const [disabledFields, setDisabledFields] = useState({
        home_team_id: false,
        away_team_id: false,
        group_name: false,
        phase: false,
        start_time: false,
    });

    useEffect(() => {
        const status = form.watch('status');
        if (status === 'jugándose' || status === 'finalizado') {
            setDisabledFields({
                home_team_id: true,
                away_team_id: true,
                group_name: true,
                phase: true,
                start_time: true,
            });
        } else {
            setDisabledFields({
                home_team_id: false,
                away_team_id: false,
                group_name: false,
                phase: false,
                start_time: false,
            });
        }
    }, [form.watch('status')]);

    const onSubmit = (values: z.infer<typeof UpdateMatchSchema>): void => {
        setError("");
        setSuccess("");
        console.log(values);

        startTransition(() => {
            updateMatch(matchId, values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    }

    const homeTeamId = useWatch({
        control: form.control,
        name: 'home_team_id',
    });

    const awayTeamId = useWatch({
        control: form.control,
        name: 'away_team_id',
    });

    const getTeamName = (teamId: string) => {
        const team = teams.find(team => team.id.toString() === teamId);
        return team ? team.name : '';
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                <FormError message={error} />
                <FormSuccess message={success} />

                <div className="flex flex-col gap-2 bg-gradient-to-tr from-primary/30 to-primary/80 p-3 rounded-lg border">

                    <div className="flex flex-row items-center">

                        <FormField
                            control={form.control}
                            name="home_team_id"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <SelectCountry field={field} teams={teams} disabled={disabledFields.home_team_id} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col items-center w-1/3 gap-1">
                            <span className="text-3xl font-black bg-clip-text text-transparent rounded-xl text-center bg-background">VS</span>
                        </div>

                        <FormField
                            control={form.control}
                            name="away_team_id"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <SelectCountry field={field} teams={teams} disabled={disabledFields.away_team_id} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="home_team_goals"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Goles de {getTeamName(homeTeamId) || match.home_team_name}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="away_team_goals"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Goles de {getTeamName(awayTeamId) || match.away_team_name}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="group_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del grupo</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={disabledFields.group_name} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phase"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fase</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={disabledFields.phase} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hora de inicio</FormLabel>
                            <FormControl>
                                {/* <Input {...field} disabled={disabledFields.start_time} /> */}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pendiente">Pendiente</SelectItem>
                                        <SelectItem value="jugándose">Jugándose</SelectItem>
                                        <SelectItem value="finalizado">Finalizado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full text-white" disabled={isPending}>
                    <Upload size={20} />&nbsp;Actualizar Partido
                </Button>
            </form>
        </Form>
    );
}