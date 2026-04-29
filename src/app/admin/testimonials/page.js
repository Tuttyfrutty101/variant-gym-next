import { createSupabaseServerClient } from "@/lib/supabase/server";
import styles from "../admin.module.css";
import TestimonialsEditor from "./TestimonialsEditor";

export default async function AdminTestimonialsPage() {
  const supabase = await createSupabaseServerClient();
  let { data, error } = await supabase
    .from("homepage_testimonial")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    const r2 = await supabase
      .from("homepage_testimonial")
      .select("*")
      .order("updated_at", { ascending: false });
    data = r2.data ?? [];
  }

  const rows = data ?? [];

  return (
    <>
      <h1 className={styles.h1}>Testimonials</h1>
      <p className={styles.lead}>
        Only rows with <strong>Active</strong> appear on the public site.
        Use <strong>↑</strong> / <strong>↓</strong> on each card to set
        carousel order (top first). Photos upload to storage; use{" "}
        <strong>Save</strong> after changing a testimonial.
      </p>
      <TestimonialsEditor initial={rows} />
    </>
  );
}
