/**
 * Centralised env-based config — import from here instead of
 * repeating process.env lookups in every file.
 */

/** Public site origin used in metadata, Open Graph, canonical URLs, JSON-LD */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://umanghospital.com'
).replace(/\/+$/, '');

/** Backend API base URL — trailing slash stripped for safe concatenation */
export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'
).replace(/\/+$/, '');
