'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useState, ChangeEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Fields {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

interface FieldsIncremented {
    name: boolean;
    lastname: boolean;
    email: boolean;
    password: boolean;
}

export function AuthForm() {
    const [progress, setProgress] = useState(0);
    const [fields, setFields] = useState<Fields>({
        name: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [fieldsIncremented, setFieldsIncremented] = useState<FieldsIncremented>({
        name: false,
        lastname: false,
        email: false,
        password: false,
    });

    const handleProgress = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const incremented = fieldsIncremented[id as keyof FieldsIncremented];

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

    return (
        <Tabs defaultValue="login" className="w-[80%]">
            <TabsList className="bg-card gap-1 flex flex-row border">
                <TabsTrigger className="w-1/2" value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger className="w-1/2" value="register">Registrarse</TabsTrigger>
            </TabsList>
            <LoginForm />
            <RegisterForm fields={fields} handleProgress={handleProgress} progress={progress} />
        </Tabs>
    );
}

interface FormProps {
    fields: Fields;
    handleProgress: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface RegisterFormProps extends FormProps {
    progress: number;
}

export function RegisterForm({ fields, handleProgress, progress }: RegisterFormProps) {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else {
            setStep(1);
        }
    }

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
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccione una carrera" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                            <SelectItem value="grapes">Grapes</SelectItem>
                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid w-full grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Campeón</Label>
                                    <Input onChange={handleProgress} id="name" type="text" placeholder="Nombre" value={fields.name} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="lastname">Sub-campeón</Label>
                                    <Input onChange={handleProgress} id="lastname" type="text" placeholder="Apellido" value={fields.lastname} />
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

export function LoginForm() {
    return (
        <TabsContent value="login">
            <Card>
                <CardHeader>
                    <CardTitle>Iniciar Sesión</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="email">Correo</Label>
                        <Input id="email" type="email" placeholder="Correo electrónico" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" placeholder="Contraseña" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Iniciar Sesión</Button>
                </CardFooter>
            </Card>
        </TabsContent>
    );
}
