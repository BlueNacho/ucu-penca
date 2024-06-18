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
import { Team } from '@/types/types';

interface SelectCountryProps {
    field: any;
    teams: Team[];
    defaultValue?: string;
}

export default function SelectCountry({ field, teams, defaultValue }: SelectCountryProps) {

    console.log(defaultValue);
    
    return (
        <Select onValueChange={field.onChange} defaultValue={defaultValue}>
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

    );
}