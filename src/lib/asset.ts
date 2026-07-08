export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public/ path with the GitHub Pages basePath in production. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
