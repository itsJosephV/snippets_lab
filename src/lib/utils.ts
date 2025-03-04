import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export {cn};

export function capitalize(str: string): string {
  if (!str) return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
}
