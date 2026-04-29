import { createSupabaseServerClient } from "@/lib/supabase/server";
import styles from "../admin.module.css";
import ContactForm from "./ContactForm";

export default async function AdminContactPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("site_contact_info")
    .select("id, address, phone_display, phone_tel, email")
    .limit(1)
    .maybeSingle();

  const initial =
    data && typeof data.id === "string"
      ? {
          id: data.id,
          address: data.address ?? "",
          phone_display: data.phone_display ?? "",
          phone_tel: data.phone_tel ?? "",
          email: data.email ?? "",
        }
      : null;

  return (
    <>
      <h1 className={styles.h1}>Contact info</h1>
      <p className={styles.lead}>
        Shown in the contact section on the homepage and contact page.
      </p>
      <ContactForm initial={initial} />
    </>
  );
}
