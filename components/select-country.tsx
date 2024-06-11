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
import { Team } from '@/lib/types/definitions';
import { ChangeEvent } from 'react';

interface SelectCountryProps {
    id: string;
    teams: Team[];
    onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectCountry({ id, teams, onSelectChange }: SelectCountryProps) {
    return (
        <div id={id}>
            <Select onValueChange={(value) => onSelectChange({ target: { id, value } } as ChangeEvent<HTMLSelectElement>)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar equipo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Equipos</SelectLabel>
                        {teams.map((team, index) => (
                            <SelectItem key={index} value={team.id.toString()}>
                                <div className="flex flex-row items-center justify-between w-full gap-2 flex-nowrap overflow-hidden text-ellipsis">
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
        </div>

    );
}