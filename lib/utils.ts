const CLASS_SEPARATOR = /\s+/g;

<<<<<<< HEAD
type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassArray;

type ClassDictionary = Record<string, boolean | null | undefined>;
interface ClassArray extends Array<ClassValue> {}

function toClassList(value: ClassValue, result: string[]): void {
  if (!value && value !== 0) {
    return;
  }

  if (typeof value === "string" || typeof value === "number") {
    const tokens = `${value}`.trim().split(CLASS_SEPARATOR);
    for (const token of tokens) {
      if (token) {
        result.push(token);
      }
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      toClassList(item, result);
    }
    return;
  }

  if (typeof value === "object") {
    for (const [token, condition] of Object.entries(value)) {
      if (condition) {
        result.push(token);
      }
    }
  }
}

export function cn(...inputs: ClassValue[]): string {
  const tokens: string[] = [];

  for (const input of inputs) {
    toClassList(input, tokens);
  }

  return tokens.join(" ");
=======
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
>>>>>>> prorigin/main
}
