import { createSupabaseServerClient } from "@/lib/supabase/server";
import styles from "../admin.module.css";
import BlockedDomainsForm from "./BlockedDomainsForm";

export default async function AdminBlockedDomainsPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("blocked_email_domains")
    .select("id, domain")
    .order("domain");

  const initial = (data ?? []).map((row) => ({
    id: row.id,
    domain: row.domain,
  }));

  return (
    <>
      <h1 className={styles.h1}>Blocked email domains</h1>
      <p className={styles.lead}>
        Submissions from these domains are refused on the contact form and the
        Second Opinion form. They are not saved, and no GymMaster prospect is
        created. Enter a domain such as example.com. Addresses at that domain
        and its subdomains are both refused.
      </p>
      <BlockedDomainsForm initial={initial} />
    </>
  );
}
