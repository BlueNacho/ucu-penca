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
import SelectCountry from "../select-country";

export default function RegisterForm({ careers, teams }: { careers: Career[], teams: Team[] }) {

    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(0);

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else {
            setStep(1);
        }
    }
  
    const [fields, setFields] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [fieldsIncremented, setFieldsIncremented] = useState({
        name: false,
        lastname: false,
        email: false,
        password: false,
    });

    const handleProgress = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const incremented = fieldsIncremented;

        if (value.length > 0 && !incremented) {
            setProgress((prevProgress) => prevProgress + 12.5);
            setFieldsIncremented((prevFields) => ({
                ...prevFields,
                [id]: true
            }));
        } else if (value.length <= 0 && incremented) {
            setProgress((prevProgress) => prevProgress - 12.5);
            setFieldsIncremented((prevFields) => ({
                ...prevFields,
                [id]: false
            }));
        }

        setFields((prevFields) => ({
            ...prevFields,
            [id]: value,
        }));
    };

    const allFieldsFilled = () => {
        return fields.name && fields.lastname && fields.email && fields.password;
    }

    return (
        <TabsContent value="register">
            <Card>
                <CardHeader className="pb-0">
                    <CardTitle>Registrarse</CardTitle>
                </CardHeader>
                <Progress className="w-[90%] mx-auto my-3" value={progress} />

                <CardContent className="space-y-2">
                    {step === 1 && (
                        <>
                            <div className="grid w-full grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input onChange={handleProgress} id="name" type="text" placeholder="Nombre" value={fields.name} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="lastname">Apellido</Label>
                                    <Input onChange={handleProgress} id="lastname" type="text" placeholder="Apellido" value={fields.lastname} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Correo</Label>
                                <Input onChange={handleProgress} id="email" type="email" placeholder="Correo electrónico" value={fields.email} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input onChange={handleProgress} id="password" type="password" placeholder="Contraseña" value={fields.password} />
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="space-y-1">
                                <Label htmlFor="email">Carrera</Label>
                                <Select>
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
                            <div className="grid w-full grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">&#x1f947; Campeón</Label>
                                    <SelectCountry teams={teams}/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="lastname">&#x1f948; Sub-campeón</Label>
                                    <SelectCountry teams={teams}/>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>

                <CardFooter className="gap-2">
                    {step === 2 && (
                        <>
                            <Button onClick={handleNext} variant={"outline"} size={"icon"}> <ChevronLeft /></Button>
                            <Button>Registrarse</Button>
                        </>
                    )}
                    {step === 1 && (
                        <Button disabled={!allFieldsFilled()} onClick={handleNext}>Siguiente <ChevronRight /></Button>
                    )}
                </CardFooter>
            </Card>
        </TabsContent>
    );
}