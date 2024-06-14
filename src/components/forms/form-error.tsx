import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
    message?: string;
}

export default function FormError({ message }: FormErrorProps) {
    if (!message) return null;

    return (
        <div className="bg-destructive/10 p-3 rounded-sm flex items-center gap-x-2 text-sm text-destructive border border-destructive">
            <TriangleAlert />
            <p>{message}</p>
        </div>
    );
}