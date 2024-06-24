import UpdateMatchForm from "@/components/forms/form-update-match";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getMatchById } from "@/data/matches";
import { getPhases } from "@/data/phases";
import { getTeams } from "@/data/teams";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const match = await getMatchById(id);
    const phases = await getPhases();
    const teams = await getTeams();

    return (
        <Card className="h-max sm:w-[90%] md:w-[90%] lg:w-[60%] xl:w-[50%] mx-auto transition-all group relative">
            <CardContent className="p-5 flex flex-row justify-center items-center">
                <UpdateMatchForm matchId={id} match={match} teams={teams} phases={phases} />
            </CardContent>
        </Card>
    );
}