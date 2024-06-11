import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'es-UY',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Formato de hora en 24 horas
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date).replace('-', ' de '); // Reemplazar guion por "de"
};