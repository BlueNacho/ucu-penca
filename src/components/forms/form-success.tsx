import { CircleCheck } from "lucide-react";

interface FormSuccessProps {
    message?: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
    if (!message) return null;

    return (
        <div className="bg-emerald-500/10 p-3 rounded-sm flex items-center gap-x-2 text-sm text-emerald-500 border border-emerald-500">
            <CircleCheck />
            <p>{message}</p>
        </div>
    );
}