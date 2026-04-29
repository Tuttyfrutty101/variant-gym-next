import { createClient } from "@supabase/supabase-js";

const OPEN_QUOTES = /^[\s\u201C\u2018"']+/;
const CLOSE_QUOTES = /[\s\u201D\u2019"']+$/;

function stripSurroundingQuotes(text) {
  let t = text.trim();
  t = t.replace(OPEN_QUOTES, "").replace(CLOSE_QUOTES, "");
  return t.trim();
}

/** Static fallback when env is missing, fetch fails, or the table is empty. */
export const FALLBACK_HOMEPAGE_TESTIMONIAL = {
  id: "fallback-default",
  quote:
    "Balancing home and work life with training can be challenging, but the team at Variant makes sure my workouts are efficient and effective. They've helped me perform at my best in every part of my life.",
  imageUrl: null,
  name: "Dr. Sean Shafi",
  title: "UCLA Health",
};

function mapRow(row) {
  const image_url = row.image_url;
  const imageUrl =
    typeof image_url === "string" && image_url.trim() !== "" ? image_url.trim() : null;

  return {
    id: typeof row.id === "string" ? row.id : String(row.id),
    quote: stripSurroundingQuotes(row.quote),
    imageUrl,
    name: row.name.trim(),
    title: row.title.trim(),
  };
}

/**
 * @returns {Promise<Array<{ id: string, quote: string, imageUrl: string | null, name: string, title: string }> | null>}
 */
export async function getHomepageTestimonials() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (typeof url !== "string" || !url.startsWith("http") || typeof key !== "string" || !key) {
    return null;
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("homepage_testimonial")
    .select("id, quote, image_url, name, title")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error || !data?.length) {
    return null;
  }

  const out = [];
  for (const row of data) {
    if (
      typeof row.quote !== "string" ||
      typeof row.name !== "string" ||
      typeof row.title !== "string"
    ) {
      continue;
    }
    out.push(mapRow(row));
  }

  return out.length > 0 ? out : null;
}
