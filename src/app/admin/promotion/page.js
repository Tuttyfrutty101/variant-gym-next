import { createSupabaseServerClient } from "@/lib/supabase/server";
import styles from "../admin.module.css";
import PromotionForm from "./PromotionForm";

export default async function AdminPromotionPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("site_promotion")
    .select("id, badge, title, body, fine_print, cta_label")
    .limit(1)
    .maybeSingle();

  const initial =
    data && typeof data.id === "string"
      ? {
          id: data.id,
          badge: data.badge ?? "",
          title: data.title ?? "",
          body: data.body ?? "",
          fine_print: data.fine_print ?? "",
          cta_label: data.cta_label ?? "",
        }
      : null;

  return (
    <>
      <h1 className={styles.h1}>Promotion</h1>
      <p className={styles.lead}>
        Homepage promo band (above testimonials). The call-to-action always
        goes to the contact form on the home page.
      </p>
      <PromotionForm initial={initial} />
    </>
  );
}
