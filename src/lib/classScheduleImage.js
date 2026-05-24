const BUCKET_PATH = "/storage/v1/object/public/class-schedule-images/";
const RENDER_PATH = "/storage/v1/render/image/public/class-schedule-images/";

/** Display size 44px; request 2× for retina. */
export const CLASS_SCHEDULE_THUMB_PX = 88;

/**
 * @param {Array<{ imageUrl?: string | null }>} classes
 */
export function prefetchClassScheduleImages(classes) {
  if (typeof window === "undefined") return;
  for (const c of classes) {
    if (!c.imageUrl) continue;
    const img = new window.Image();
    img.src = classScheduleThumbUrl(c.imageUrl);
  }
}


/**
 * Supabase CDN thumbnail URL for schedule avatars (much smaller than full upload).
 * Falls back to the original URL for non-schedule or non-Supabase sources.
 * @param {string | null | undefined} url
 * @param {number} [sizePx]
 */
export function classScheduleThumbUrl(url, sizePx = CLASS_SCHEDULE_THUMB_PX) {
  if (typeof url !== "string" || url.trim().length === 0) return url ?? "";
  const idx = url.indexOf(BUCKET_PATH);
  if (idx === -1) return url;
  const base = url.slice(0, idx);
  const path = url.slice(idx + BUCKET_PATH.length);
  const params = new URLSearchParams({
    width: String(sizePx),
    height: String(sizePx),
    resize: "cover",
    quality: "80",
  });
  return `${base}${RENDER_PATH}${path}?${params.toString()}`;
}
