'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from 'next/image';
import { Team } from '@/lib/definitions';

export default function SelectCountry({ teams }: { teams: Team[] }) {
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar equipo" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Equipos</SelectLabel>
                    {teams.map((team: Team) => (
                        <SelectItem key={team.id} value={team.id}>
                            <div className="flex flex-row items-center justify-between w-full gap-2">
                                <div className="rounded-full w-[25px] h-[25px] overflow-hidden relative">
                                    <Image src={`https://flagcdn.com/${team.code}.svg`} alt="Country flag" fill className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center' }} />
                                </div>
                                {team.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>

    );
}