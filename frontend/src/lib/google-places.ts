/**
 * Google Place reviews for "Patient care stories" section.
 * Fetches reviews only when both GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set.
 * API key is optional: without it, the section uses fallback testimonials; use GOOGLE_PLACE_ID alone for a "View on Google" link.
 */

export type GoogleReview = {
  quote: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  relativeTime?: string;
};

type LegacyPlaceReview = {
  author_name?: string;
  profile_photo_url?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
};

type LegacyPlaceDetailsResponse = {
  result?: { reviews?: LegacyPlaceReview[] };
  status?: string;
  error_message?: string;
};

const FALLBACK_AVATAR = "/images/doctor-img.svg";

function normalizeReview(r: LegacyPlaceReview): GoogleReview {
  const text = r.text?.trim() || "";
  const name = r.author_name?.trim() || "Google User";
  const rating = typeof r.rating === "number" ? Math.min(5, Math.max(0, Math.round(r.rating))) : 5;
  return {
    quote: text || "No review text.",
    name,
    location: "Google review",
    avatar: r.profile_photo_url || FALLBACK_AVATAR,
    rating,
    relativeTime: r.relative_time_description?.trim(),
  };
}

export async function getGooglePlaceReviews(): Promise<GoogleReview[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey?.trim() || !placeId?.trim()) {
    return null;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId.trim());
  url.searchParams.set("fields", "reviews");
  url.searchParams.set("key", apiKey.trim());

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    const data = (await res.json()) as LegacyPlaceDetailsResponse;

    if (data.status !== "OK" || !Array.isArray(data.result?.reviews)) {
      return null;
    }

    const reviews = data.result.reviews
      .filter((r) => r.text?.trim())
      .slice(0, 10)
      .map(normalizeReview);

    return reviews.length > 0 ? reviews : null;
  } catch {
    return null;
  }
}
