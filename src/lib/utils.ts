import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;

export function toArabicDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);
}

export function formatArabicNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
): string {
  const formatted = new Intl.NumberFormat("en-US", options).format(value);
  return toArabicDigits(formatted);
}

export function formatSAR(value: number): string {
  return `${formatArabicNumber(value)} ر.س`;
}

export function formatCompact(value: number): string {
  if (value >= 1_000_000)
    return `${toArabicDigits((value / 1_000_000).toFixed(2))} مليون`;
  if (value >= 1_000) return `${toArabicDigits((value / 1_000).toFixed(1))}K`;
  return toArabicDigits(value);
}
