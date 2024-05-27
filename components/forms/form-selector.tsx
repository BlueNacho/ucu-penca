'use client';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";


export default function FormSelector({ children }: { children: React.ReactNode }) {
    return (
        <Tabs defaultValue="login" className="w-[80%]">
            <TabsList className="bg-card gap-1 flex flex-row border">
                <TabsTrigger className="w-1/2" value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger className="w-1/2" value="register">Registrarse</TabsTrigger>
            </TabsList>
            {children}
        </Tabs>
    );
}



