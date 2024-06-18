import UpdateMatchForm from "@/components/forms/form-update-match";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getAdminMatchById } from "@/data/matches";
import { getTeams } from "@/data/teams";
import { formatDateToLocal } from "@/lib/utils";
import Image from "next/image";


export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const match = await getAdminMatchById(id)
    const teams = await getTeams();

    return (
        <Card className="h-full w-max mx-auto transition-all group relative">
            <CardContent className="p-5 flex flex-row justify-center items-center w-max mx-auto">
                <UpdateMatchForm matchId={id} match={match} teams={teams} />
            </CardContent>
        </Card>
    );
}