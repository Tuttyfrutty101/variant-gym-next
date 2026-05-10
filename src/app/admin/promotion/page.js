import { createSupabaseServerClient } from "@/lib/supabase/server";
import styles from "../admin.module.css";
import PromotionForm from "./PromotionForm";

export default async function AdminPromotionPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("site_promotion")
    .select("id, badge, title, body, fine_print, cta_label, visible")
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
          visible: data.visible !== false,
        }
      : null;

  return (
    <>
      <h1 className={styles.h1}>Promo block</h1>
      <p className={styles.lead}>
        Homepage promo band (above testimonials). The call-to-action always
        goes to the contact form on the home page.
      </p>
      <PromotionForm initial={initial} />
    </>
  );
}
