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
import { SquarePlus, Trash2, Upload } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMatchSchema } from "@/schemas";
import SelectCountry from "../select-country";
import { createMatch } from "@/actions/matches";
import {  Team, Phase } from "@/types/types";
import { z } from "zod";
import { DateTimePicker } from "../ui/datetime-picker";

export default function CreateMatchForm({ teams, phases }: { teams: Team[], phases: Phase[] }) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CreateMatchSchema>>({
        resolver: zodResolver(CreateMatchSchema),
        defaultValues: {
            away_team_id: "",
            group_name: "",
            home_team_id: "",
            phase: "",
            start_time: new Date(),
            status: "pendiente",
        }
    });

    const onSubmit = (values: z.infer<typeof CreateMatchSchema>): void => {
        setError("");
        setSuccess("");

        startTransition(() => {
            createMatch(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
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
                                        <SelectCountry field={field} teams={teams} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <span className="text-xl font-black bg-clip-text text-transparent rounded-xl text-center bg-gradient-to-tr from-blue-600 to-blue-400">VS</span>

                        <FormField
                            control={form.control}
                            name="away_team_id"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <SelectCountry field={field} teams={teams} />
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
                        name="group_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del grupo</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isGroupNameEnabled} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
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

                                <Select onValueChange={(value) => handlePhaseChange(value)} value={field.value}>
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
                                <DateTimePicker granularity="second" jsDate={field.value} onJsDateChange={field.onChange} hourCycle={24} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="text-white w-full" disabled={isPending}>
                    <SquarePlus size={20} />&nbsp;Crear Partido
                </Button>

            </form>
        </Form>
    );
}