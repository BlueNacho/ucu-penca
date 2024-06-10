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
import { Team, Career } from "@/lib/definitions";

export default function RegisterForm({ teams, careers }: { teams: Team[], careers: Career[] }) {
    return (
        <form action="">
            <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre*</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastname">Apellido*</Label>
                        <Input
                            id="lastname"
                            type="text"
                            placeholder="Apellido"
                            required
                        />
                    </div>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="email">Correo*</Label>
                    </div>
                    <Input id="mail" type="email" placeholder="Correo" required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="email">Carrera*</Label>
                    </div>
                    <Select>
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
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Contraseña*</Label>
                    </div>
                    <Input id="password" type="password" placeholder="Contraseña" required />
                </div>
                <div className="relative flex items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400">Esta elección no se podrá cambiar</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 border p-3 bg-gradient-to-r from-card to-primary/10 rounded-sm">
                    <div className="grid gap-2">
                        <Label htmlFor="name">&#x1f3c6; Campeón*</Label>
                        <Select>
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
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastname">&#x1f948; Sub-campeón*</Label>
                        <Select>
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
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Registrarse
                </Button>
            </div>
        </form>
    );
}