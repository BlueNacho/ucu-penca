'use client'

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent } from "react";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Career, Team } from "@/lib/definitions";
import SelectCountry from "@/components/select-country";

export default function RegisterForm({ careers, teams }: { careers: Career[], teams: Team[] }) {

    const [step, setStep] = useState(1);
    const [fields, setFields] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        career: '',
        champion: '',
        runnerUp: ''
    });

    const prueba = () => {
        console.log(fields);
    }

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else {
            setStep(1);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = event.target;
        setFields((prevFields) => ({
            ...prevFields,
            [id]: value,
        }));
    };

    const firstStepFieldsFilled = () => {
        return Object.values(fields).slice(0, 4).every(field => field.length > 0);
    };

    const allFieldsFilled = () => {
        return Object.values(fields).every(field => field.length > 0);
    };

    const progress = Object.values(fields).filter(field => field.length > 0).length * (100 / Object.keys(fields).length);

    return (
        <TabsContent value="register">
            <Card>
                <CardHeader className="pb-0">
                    <CardTitle>Registrarse</CardTitle>
                </CardHeader>
                <Progress className="w-[90%] mx-auto my-3" value={progress} />

                <CardContent className="space-y-2">
                    <form className="space-y-2">
                        {step === 1 && (
                            <>
                                <div className="grid w-full grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input onChange={handleChange} id="name" type="text" placeholder="Nombre" value={fields.name} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="lastname">Apellido</Label>
                                        <Input onChange={handleChange} id="lastname" type="text" placeholder="Apellido" value={fields.lastname} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Correo</Label>
                                    <Input onChange={handleChange} id="email" type="email" placeholder="Correo electrónico" value={fields.email} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input onChange={handleChange} id="password" type="password" placeholder="Contraseña" value={fields.password} />
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="space-y-1">
                                    <Label htmlFor="career">Carrera</Label>
                                    <div id="career">
                                        <Select onValueChange={(value) => handleChange({ target: { id: 'career', value } } as ChangeEvent<HTMLSelectElement>)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar carrera" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Carreras</SelectLabel>
                                                    {careers.map((career, index) => (
                                                        <SelectItem key={index} value={career.id.toString()}>{career.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid w-full grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="champion">&#x1f947; Campeón</Label>
                                        <SelectCountry id="champion" teams={teams} onSelectChange={handleChange} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="runnerUp">&#x1f948; Sub-campeón</Label>
                                        <SelectCountry id="runnerUp" teams={teams} onSelectChange={handleChange} />
                                    </div>
                                </div>
                            </>
                        )}
                    </form>
                </CardContent>

                <CardFooter className="gap-2">
                    {step === 2 && (
                        <>
                            <Button onClick={handleNext} variant={"outline"} size={"icon"}> <ChevronLeft /></Button>
                            <Button disabled={!allFieldsFilled()} onClick={prueba}>Registrarse</Button>
                        </>
                    )}
                    {step === 1 && (
                        <Button disabled={!firstStepFieldsFilled()} onClick={handleNext}>Siguiente <ChevronRight /></Button>
                    )}
                </CardFooter>
            </Card>
        </TabsContent>
    );
}