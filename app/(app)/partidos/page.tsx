import { fetchMatches } from "@/lib/data";
import { Match } from "@/lib/definitions";

export default async function Page() {

    const matches: Match[] = await fetchMatches();

    return (
        <div className="flex-grow flex h-full">
            <h1>Partidos</h1>
            <ul>
                {matches.map((match) => (
                    <li key={match.id}>{match.team1_goals} vs {match.team2_id}</li>
                ))}
            </ul>
        </div>
    );
}