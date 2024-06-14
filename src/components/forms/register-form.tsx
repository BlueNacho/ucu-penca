'use client'

import { Label } from "@/components/ui/label";
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
import { Team, Career } from "@/types/types";
import SelectCountry from "../select-country";
import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { register } from "@/actions/auth";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { redirect } from 'next/navigation'

export default function RegisterForm({ teams, careers }: { teams: Team[], careers: Career[] }) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            lastname: "",
            email: "",
            career: "",
            password: "",
            champion: "",
            runnerUp: "",
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log(values);
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);

                    if (data.success) {
                        form.reset();
                        // setTimeout(() => {
                        //     redirect('/auth/login')
                        // }, 2000)
                    }
                });
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            type="text"
                                            placeholder="Luis"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="lastname">Apellido</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            type="text"
                                            placeholder="Suaréz"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Correo</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        type="email"
                                        placeholder="luis.suarez@ejemplo.com"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="career"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="career">Carrera</FormLabel>
                                <FormControl>

                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione carrera" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Carrera</SelectLabel>
                                                {careers.map((career) => (
                                                    <SelectItem key={career.id} value={career.id.toString()}>
                                                        {career.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="password">Contraseña</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        type="password"
                                        placeholder="******"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Esta elección no se podrá cambiar</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 border p-3 bg-gradient-to-r from-card to-primary/10 rounded-sm">
                        <FormField
                            control={form.control}
                            name="champion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="champion">&#x1f3c6; Campeón</FormLabel>
                                    <FormControl>

                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccione equipo" />
                                            </SelectTrigger>
                                            <SelectContent {...field}>
                                                <SelectGroup>
                                                    <SelectLabel>Selecciones</SelectLabel>
                                                    {teams.map((team, index) => (
                                                        <SelectItem key={index} value={team.id.toString()}>
                                                            <div className="flex flex-row items-center justify-between w-full gap-2 flex-nowrap overflow-hidden text-ellipsis">
                                                                <div className="rounded-sm w-[30px] h-[25px] overflow-hidden relative">
                                                                    <Image src={`https://flagcdn.com/${team.code}.svg`} alt="Country flag" fill className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center' }} />
                                                                </div>
                                                                {team.name}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                    <FormMessage />
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

                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccione equipo" />
                                            </SelectTrigger>
                                            <SelectContent {...field}>
                                                <SelectGroup>
                                                    <SelectLabel>Selecciones</SelectLabel>
                                                    {teams.map((team, index) => (
                                                        <SelectItem key={index} value={team.id.toString()}>
                                                            <div className="flex flex-row items-center justify-between w-full gap-2 flex-nowrap overflow-hidden text-ellipsis">
                                                                <div className="rounded-sm w-[30px] h-[25px] overflow-hidden relative">
                                                                    <Image src={`https://flagcdn.com/${team.code}.svg`} alt="Country flag" fill className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center' }} />
                                                                </div>
                                                                {team.name}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <Button type="submit" className="w-full text-white" disabled={isPending}>
                        Crear cuenta&nbsp;<LogIn size={20} />
                    </Button>
                </div>
            </form>
        </Form>
    );
}