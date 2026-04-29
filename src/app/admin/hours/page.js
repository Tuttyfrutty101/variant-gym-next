import { createSupabaseServerClient } from "@/lib/supabase/server";
import { WEEKDAY_NAMES_MON_FIRST } from "@/lib/siteContent";
import styles from "../admin.module.css";
import HoursForm from "./HoursForm";

export default async function AdminHoursPage() {
  const supabase = await createSupabaseServerClient();
  const { data: rows } = await supabase
    .from("site_business_hours")
    .select("day_index, label")
    .order("day_index");

  const list = rows ?? [];
  const initial = WEEKDAY_NAMES_MON_FIRST.map((name, day_index) => {
    const r = list.find((x) => x.day_index === day_index);
    return {
      day_index,
      weekday: name,
      label: typeof r?.label === "string" ? r.label : "",
    };
  });

  return (
    <>
      <h1 className={styles.h1}>Business hours</h1>
      <p className={styles.lead}>
        One line per day (e.g. 6:30am – 6:30pm or Closed). These lists appear
        on the homepage contact block, promotion section, and testimonials.
      </p>
      <HoursForm initial={initial} />
    </>
  );
}
