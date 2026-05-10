import { createClient } from "@supabase/supabase-js";

/** day_index in DB: 0 = Monday … 6 = Sunday */
export const WEEKDAY_NAMES_MON_FIRST = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const FALLBACK_SITE_CONTENT = {
  hours: WEEKDAY_NAMES_MON_FIRST.map((weekday, dayIndex) => ({
    dayIndex,
    weekday,
    label:
      dayIndex <= 3
        ? "6:30am – 6:30pm"
        : dayIndex === 4
          ? "6:30am – 2:00pm"
          : dayIndex === 5
            ? "8:00am – 1:00pm"
            : "Closed",
  })),
  contact: {
    address: "314 Anacapa St., Santa Barbara, CA 93101",
    phoneDisplay: "(805) 837-8475",
    phoneTel: "tel:+18058378475",
    email: "info@varianttraininglab.com",
  },
  promotion: {
    badge: "Limited time · Spring",
    title: "Spring membership offer",
    body:
      "Join before Memorial Day and we\u2019ll waive your enrollment fee, plus include two guest passes so you can train with a partner on us.",
    finePrint:
      "Offer valid for new memberships through May 26, 2026. Not combinable with other promotions.",
    ctaLabel: "Claim this offer",
    visible: true,
  },
};

function mapHours(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return FALLBACK_SITE_CONTENT.hours;
  const byDay = new Map(rows.map((r) => [r.day_index, r.label]));
  return WEEKDAY_NAMES_MON_FIRST.map((weekday, dayIndex) => ({
    dayIndex,
    weekday,
    label:
      typeof byDay.get(dayIndex) === "string"
        ? String(byDay.get(dayIndex))
        : FALLBACK_SITE_CONTENT.hours[dayIndex].label,
  }));
}

/**
 * Public site content (anon). Safe for Server Components; no cookies.
 */
export async function getSiteContent() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (typeof url !== "string" || !url.startsWith("http") || typeof key !== "string") {
    return FALLBACK_SITE_CONTENT;
  }

  const supabase = createClient(url, key);

  const [hoursRes, contactRes, promotionRes] = await Promise.all([
    supabase.from("site_business_hours").select("day_index, label").order("day_index"),
    supabase.from("site_contact_info").select("address, phone_display, phone_tel, email").limit(1).maybeSingle(),
    supabase
      .from("site_promotion")
      .select("badge, title, body, fine_print, cta_label, visible")
      .limit(1)
      .maybeSingle(),
  ]);

  const hours =
    hoursRes.error || !hoursRes.data?.length
      ? FALLBACK_SITE_CONTENT.hours
      : mapHours(hoursRes.data);

  const c = contactRes.data;
  const contact =
    contactRes.error ||
    !c ||
    typeof c.address !== "string" ||
    typeof c.phone_display !== "string" ||
    typeof c.phone_tel !== "string" ||
    typeof c.email !== "string"
      ? FALLBACK_SITE_CONTENT.contact
      : {
          address: c.address,
          phoneDisplay: c.phone_display,
          phoneTel: c.phone_tel,
          email: c.email,
        };

  const p = promotionRes.data;
  const promotion =
    promotionRes.error ||
    !p ||
    typeof p.badge !== "string" ||
    typeof p.title !== "string" ||
    typeof p.body !== "string" ||
    typeof p.fine_print !== "string" ||
    typeof p.cta_label !== "string"
      ? FALLBACK_SITE_CONTENT.promotion
      : {
          badge: p.badge,
          title: p.title,
          body: p.body,
          finePrint: p.fine_print,
          ctaLabel: p.cta_label,
          visible: p.visible !== false,
        };

  return { hours, contact, promotion };
}

/** @typedef {{ id: string; name: string; time: string }} SiteClassRow */

/**
 * Weekly class list for /schedule (anon). Safe for Server Components.
 * @returns {Promise<Array<{ dayIndex: number; weekday: string; classes: SiteClassRow[] }>>}
 */
export async function getClassSchedule() {
  const empty = WEEKDAY_NAMES_MON_FIRST.map((weekday, dayIndex) => ({
    dayIndex,
    weekday,
    classes: [],
  }));

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (typeof url !== "string" || !url.startsWith("http") || typeof key !== "string") {
    return empty;
  }

  const supabase = createClient(url, key);
  const res = await supabase
    .from("site_class_schedule")
    .select("id, day_index, sort_order, class_name, class_time")
    .order("day_index", { ascending: true })
    .order("sort_order", { ascending: true });

  if (res.error || !Array.isArray(res.data)) {
    return empty;
  }

  /** @type {Map<number, SiteClassRow[]>} */
  const byDay = new Map(WEEKDAY_NAMES_MON_FIRST.map((_, dayIndex) => [dayIndex, []]));

  for (const row of res.data) {
    const di = row.day_index;
    if (typeof di !== "number" || di < 0 || di > 6) continue;
    const list = byDay.get(di);
    if (!list) continue;
    const name = typeof row.class_name === "string" ? row.class_name : "";
    const time = typeof row.class_time === "string" ? row.class_time : "";
    list.push({
      id: typeof row.id === "string" ? row.id : "",
      name,
      time,
    });
  }

  return WEEKDAY_NAMES_MON_FIRST.map((weekday, dayIndex) => ({
    dayIndex,
    weekday,
    classes: byDay.get(dayIndex) ?? [],
  }));
}
