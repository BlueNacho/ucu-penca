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
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
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
