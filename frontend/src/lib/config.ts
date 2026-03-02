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

/**
 * Server-side only API URL.
 * On VPS, set BACKEND_URL=http://localhost:4000 so server components
 * call the API directly (avoids loopback/firewall issues with the public domain).
 * Falls back to NEXT_PUBLIC_API_URL so it works without extra config in dev.
 */
export const SERVER_API_URL = (
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000'
).replace(/\/+$/, '');
