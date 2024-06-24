import CreateMatchForm from "@/components/forms/form-create-match";
import { Card, CardContent } from "@/components/ui/card";
import { getPhases } from "@/data/phases";
import { getTeams } from "@/data/teams";

export default async function Page() {
    const phases = await getPhases();
    const teams = await getTeams();

    return (
        <Card className="h-full sm:w-[90%] md:w-[90%] lg:w-[60%] xl:w-[50%] mx-auto transition-all group relative">
            <CardContent className="p-5 flex flex-row justify-center items-center">
                <CreateMatchForm teams={teams} phases={phases} />
            </CardContent>
        </Card>
    );
}