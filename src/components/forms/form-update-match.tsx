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
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { CalendarIcon, Upload } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateMatchSchema } from "@/schemas";
import SelectCountry from "../select-country";
import { updateMatch } from "@/actions/matches";
import { MatchDisplayed, Team } from "@/types/types";
import { z } from "zod";
import { format } from "path";

export default function UpdateMatchForm({ matchId, match, teams }: { matchId: string, match: MatchDisplayed, teams: Team[] }) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [date, setDate] = useState<Date>()

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
        home_team_goals: false,
        away_team_goals: false,
        group_name: false,
        phase: false,
        start_time: false,
    });

    useEffect(() => {
        const status = form.watch('status');
        if (status === 'pendiente') {
            setDisabledFields({
                home_team_id: false,
                away_team_id: false,
                home_team_goals: true,
                away_team_goals: true,
                group_name: false,
                phase: false,
                start_time: false,
            });
        } else if (status === 'jugándose') {
            setDisabledFields({
                home_team_id: true,
                away_team_id: true,
                home_team_goals: false,
                away_team_goals: false,
                group_name: true,
                phase: true,
                start_time: true,
            });
        } else if (status === 'finalizado') {
            setDisabledFields({
                home_team_id: true,
                away_team_id: true,
                home_team_goals: true,
                away_team_goals: true,
                group_name: true,
                phase: true,
                start_time: true,
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
                <FormError message={error} />
                <FormSuccess message={success} />

                <div className="flex flex-col gap-2 p-3 rounded-lg border bg-primary/5">

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

                        <div className="flex flex-col items-center w-1/4 gap-1">
                            <span className="text-2xl font-black bg-clip-text text-transparent rounded-xl text-center bg-gradient-to-tr from-blue-400 to-blue-600">VS</span>
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

                    <div className="flex flex-col items-center gap-1 bg-gradient-to-tr from-primary/30 to-primary/80 p-2 rounded-lg">
                        <span className="text-card-foreground uppercase font-black tracking-wider">Marcador</span>

                        <div className="grid grid-cols-2 gap-2 ">
                            <FormField
                                control={form.control}
                                name="home_team_goals"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="text-center"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                disabled={disabledFields.home_team_goals}
                                            />
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
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="text-center"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                disabled={disabledFields.home_team_goals}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                </div>


                <div className="grid grid-cols-2 gap-2">
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
                </div>

                <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Fecha y hora de inicio</FormLabel>
                            <FormControl>
                                <Popover >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Fecha</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

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