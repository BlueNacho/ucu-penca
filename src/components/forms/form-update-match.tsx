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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { Minus, Trash2, Upload } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateMatchSchema } from "@/schemas";
import SelectCountry from "../select-country";
import { deleteMatch, updateMatch } from "@/actions/matches";
import { MatchDisplayed, Team, Phase } from "@/types/types";
import { z } from "zod";
import { DateTimePicker } from "../ui/datetime-picker";
import { watch } from "fs";
import clsx from "clsx";
import { calculateScoresByMatchId } from "@/actions/admin";

export default function UpdateMatchForm({ matchId, match, teams, phases }: { matchId: string, match: MatchDisplayed, teams: Team[], phases: Phase[] }) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [isFinalModeEnabled, enableFinalMode] = useState(false);

    const form = useForm<z.infer<typeof UpdateMatchSchema>>({
        resolver: zodResolver(UpdateMatchSchema),
        defaultValues: {
            away_team_goals: match.away_team_goals,
            away_team_id: match.away_team_id.toString(),
            group_name: match.group_name || "",
            home_team_goals: match.home_team_goals,
            home_team_id: match.home_team_id.toString(),
            phase: match.phase.toString(),
            start_time: new Date(match.start_time),
            status: match.status,
            champion: "",
            runnerUp: "",
        }
    });

    const finalistTeams = teams.filter(team => parseInt(team.id) === match.home_team_id || parseInt(team.id) === match.away_team_id);

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
        const phase = form.watch('phase');

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
            enableFinalMode(false);
            form.setValue("champion", "");
            form.setValue("runnerUp", "");
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
            enableFinalMode(false);
            form.setValue("champion", "");
            form.setValue("runnerUp", "");
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
            if (phase === "6") {
                enableFinalMode(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.watch('status')]);

    const onSubmit = (values: z.infer<typeof UpdateMatchSchema>): void => {
        setError("");
        setSuccess("");
        
        startTransition(() => {
            updateMatch(matchId, values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    }

    const onDelete = () => {
        setError("");
        setSuccess("");

        startTransition(() => {
            deleteMatch(matchId)
        });
    }

    const isGroupNameEnabled = ["1", "2", "3"].includes(form.watch("phase"));

    const handlePhaseChange = (value: string) => {
        form.setValue("phase", value); // Actualizar el valor de la fase en el formulario
        if (!["1", "2", "3"].includes(value)) {
            form.setValue("group_name", ""); // Resetear group_name si la fase no es "1", "2" o "3"
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
                <FormError message={error} />
                <FormSuccess message={success} />

                <div className="flex flex-col gap-2 p-3 rounded-lg bg-primary/10">

                    <div className="flex flex-row gap-2 items-center">

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

                        <div className="flex flex-row gap-2 items-center">
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

                            <span className="font-bold">
                                -
                            </span>

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
                                    <Input {...field} disabled={disabledFields.group_name || !isGroupNameEnabled} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
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

                                <Select onValueChange={(value) => {
                                    handlePhaseChange(value)
                                    field.onChange
                                }} value={field.value} disabled={disabledFields.phase}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione fase" />
                                    </SelectTrigger>
                                    <SelectContent {...field}>
                                        <SelectGroup>
                                            <SelectLabel>Fase</SelectLabel>
                                            {phases.map((phase) => (
                                                <SelectItem key={phase.id} value={phase.id.toString()}>
                                                    {phase.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

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
                                <DateTimePicker granularity="second" jsDate={field.value} onJsDateChange={field.onChange} hourCycle={24} isDisabled={disabledFields.start_time} />
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

                <div className={clsx("grid grid-cols-2 border gap-2 p-3 bg-primary/5 rounded-lg",
                    !isFinalModeEnabled && "hidden"
                )}>
                    <FormField
                        control={form.control}
                        name="champion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="champion">&#x1f3c6; Campeón</FormLabel>
                                <FormControl>
                                    <SelectCountry field={field} teams={finalistTeams} />
                                </FormControl>
                                <FormMessage className="text-white"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="runnerUp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="runnerUp">&#x1f948; Sub-campeón</FormLabel>
                                <FormControl>
                                    <SelectCountry field={field} teams={finalistTeams} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-row gap-2">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="button" variant="destructive" size="icon" className="text-white flex-shrink" disabled={isPending}>
                                <Trash2 size={20} />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción borrará el partido. <br />
                                    <strong className="text-destructive">Esta acción no se podrá deshacer.</strong>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction className="text-white" onClick={() => onDelete()}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Button className="text-white flex-grow" type="submit" disabled={isPending}>
                        <Upload size={20} />&nbsp;Actualizar Partido
                    </Button>
                </div>
            </form>
        </Form>
    );
}