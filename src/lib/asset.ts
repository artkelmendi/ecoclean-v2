export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public/ path with the configured deployment base path. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
