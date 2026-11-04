const DOMAIN_RE =
  /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;

/** Strip a pasted address or URL down to a lowercase domain. */
export function normalizeEmailDomain(value) {
  let domain = String(value ?? "").trim().toLowerCase();
  domain = domain.replace(/^@+/, "");
  domain = domain.replace(/^https?:\/\//, "");
  domain = domain.split("/")[0] ?? "";
  if (domain.includes("@")) {
    domain = domain.split("@").pop() ?? "";
  }
  return domain.replace(/\.$/, "");
}

export function isDomainShape(domain) {
  return domain.length >= 3 && domain.length <= 253 && DOMAIN_RE.test(domain);
}

export function emailMatchesBlockedDomain(email, blockedDomain) {
  const domain = String(email).split("@")[1]?.toLowerCase() ?? "";
  const blocked = String(blockedDomain).toLowerCase();
  if (!domain || !blocked) return false;
  return domain === blocked || domain.endsWith(`.${blocked}`);
}

const REJECTED_MESSAGE =
  "We couldn't accept this submission. Please email info@varianttraininglab.com or call 805-837-8475.";

export function blockedEmailResponse() {
  return { error: REJECTED_MESSAGE, status: 400 };
}

/** @param {import("@supabase/supabase-js").SupabaseClient} supabase */
export async function submissionEmailIsBlocked(supabase, email, logPrefix) {
  const { data, error } = await supabase
    .from("blocked_email_domains")
    .select("domain");

  if (error) {
    console.error(`${logPrefix} blocked-domain lookup failed:`, error.message);
    return { blocked: false, lookupFailed: true };
  }

  const blocked = (data ?? []).some((row) =>
    emailMatchesBlockedDomain(email, row.domain),
  );
  if (blocked) {
    const domain = String(email).split("@")[1]?.toLowerCase() ?? "";
    console.warn(`${logPrefix} rejected blocked email domain:`, domain);
  }
  return { blocked, lookupFailed: false };
}
