// Capitalize only the first letter of a string
export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getNum(q: unknown): number | undefined {
  // Converts value to number, returns undefined if not convertible
  const n = Number(q);
  return typeof q !== "undefined" && !isNaN(n) ? n : undefined;
}
