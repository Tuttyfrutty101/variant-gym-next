import { createSupabaseServerClient } from "@/lib/supabase/server";
import { WEEKDAY_NAMES_MON_FIRST } from "@/lib/siteContent";
import styles from "../admin.module.css";
import ClassScheduleForm from "./ClassScheduleForm";

export default async function AdminSchedulePage() {
  const supabase = await createSupabaseServerClient();
  const { data: rows } = await supabase
    .from("site_class_schedule")
    .select("id, day_index, sort_order, class_name, class_time, image_url")
    .order("day_index", { ascending: true })
    .order("sort_order", { ascending: true });

  const list = rows ?? [];
  const initial = WEEKDAY_NAMES_MON_FIRST.map((weekday, day_index) => ({
    day_index,
    weekday,
    classes: list
      .filter((r) => r.day_index === day_index)
      .map((r) => ({
        clientKey: typeof r.id === "string" ? r.id : crypto.randomUUID(),
        name: typeof r.class_name === "string" ? r.class_name : "",
        time: typeof r.class_time === "string" ? r.class_time : "",
        image_url:
          typeof r.image_url === "string" ? r.image_url : "",
      })),
  }));

  return (
    <>
      <h1 className={styles.h1}>Class schedule</h1>
      <p className={styles.lead}>
        Set class names, times, and optional photos for each weekday. The public{" "}
        <strong>Schedule</strong> page updates within about a minute after you
        save. Empty rows are skipped; clearing every row removes classes for
        that day.
      </p>
      <ClassScheduleForm initial={initial} />
    </>
  );
}
