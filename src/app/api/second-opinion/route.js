import { NextResponse } from "next/server";
import { blockedEmailResponse, submissionEmailIsBlocked } from "@/lib/blockedEmailDomains";
import { verifyTurnstile } from "@/lib/turnstile";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

function hasText(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function trimmed(v) {
  return typeof v === "string" ? v.trim() : "";
}

function simpleEmailOk(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function simplePhoneOk(phone) {
  return String(phone).replace(/\D/g, "").length >= 10;
}

function buildNotes({ name, email, phone, preferredContact, availability, reasons, otherText }) {
  const parts = ["Source: Second Opinion Assessment form"];
  if (preferredContact) parts.push(`Preferred contact method: ${preferredContact}`);

  if (reasons.length > 0) {
    const core = reasons.filter((r) => r !== "Other").join(", ");
    if (core) parts.push(`Reason for assessment: ${core}`);
    if (reasons.includes("Other") && otherText) {
      parts.push(`Other (specified): ${otherText}`);
    }
  }

  if (Array.isArray(availability) && availability.length > 0) {
    const lines = availability.map((a) =>
      a.times && a.times.length > 0
        ? `${a.day}: ${a.times.join(", ")}`
        : a.day,
    );
    parts.push(`Preferred availability:\n  ${lines.join("\n  ")}`);
  }

  return parts.join("\n");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const turnstileToken = trimmed(body?.turnstileToken);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const isHuman = await verifyTurnstile(turnstileToken, ip);
  if (!isHuman) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 403 },
    );
  }

  const name = trimmed(body?.name);
  const email = trimmed(body?.email);
  const phone = trimmed(body?.phone);
  const preferredContact = trimmed(body?.preferredContact);
  const availability = Array.isArray(body?.availability) ? body.availability : [];
  const reasons = Array.isArray(body?.reasons) ? body.reasons : [];
  const otherText = trimmed(body?.otherText);

  if (!hasText(name)) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!hasText(email) || !simpleEmailOk(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  if (!hasText(phone) || !simplePhoneOk(phone)) {
    return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
  }
  if (name.length > 240 || email.length > 320 || phone.length > 40) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }

  const notes = buildNotes({ name, email, phone, preferredContact, availability, reasons, otherText });

  const supabase = createSupabaseServiceClient("[second-opinion]");
  if (!supabase) {
    return NextResponse.json(
      { error: "Server misconfiguration. Please try again later." },
      { status: 500 },
    );
  }

  const block = await submissionEmailIsBlocked(supabase, email, "[second-opinion]");
  if (block.lookupFailed) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
  if (block.blocked) {
    const rejected = blockedEmailResponse();
    return NextResponse.json({ error: rejected.error }, { status: rejected.status });
  }

  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name,
    email,
    phone,
    interest: "Second Opinion Assessment",
    goals: notes,
  });

  if (dbError) {
    console.error("[second-opinion] Supabase insert failed:", dbError.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  const baseUrl = process.env.GYMMASTER_BASE_URL?.trim();
  const apiKey = process.env.GYMMASTER_API_KEY?.trim();
  const companyId = process.env.GYMMASTER_COMPANY_ID?.trim();

  if (baseUrl && apiKey && companyId) {
    const prospectUrl = `${baseUrl.replace(/\/+$/, "")}/portal/api/v1/prospect/create`;
    const formData = new FormData();
    formData.append("api_key", apiKey);
    formData.append("firstname", name.split(" ")[0] ?? name);
    formData.append("surname", name.split(" ").slice(1).join(" ") || "");
    formData.append("email", email);
    formData.append("companyid", companyId);
    formData.append("promotion_id", "277618");
    formData.append("notes", notes);
    if (phone) formData.append("phonecell", phone);

    try {
      const gmRes = await fetch(prospectUrl, { method: "POST", body: formData });
      const text = await gmRes.text();
      let gmJson = null;
      try { gmJson = text ? JSON.parse(text) : null; } catch {}
      const gmError =
        !gmJson || typeof gmJson !== "object"
          ? !gmRes.ok ? text || gmRes.statusText : null
          : gmJson.error && String(gmJson.error).length > 0
            ? String(gmJson.error)
            : !gmRes.ok ? text || gmRes.statusText : null;
      if (gmError) {
        console.error("[second-opinion] GymMaster prospect/create failed:", {
          status: gmRes.status,
          body: text,
        });
      } else {
        console.log("[second-opinion] GymMaster prospect/create ok:", {
          status: gmRes.status,
          memberid: gmJson?.memberid,
        });
      }
    } catch (err) {
      console.error("[second-opinion] GymMaster request threw:", err);
    }
  } else {
    console.warn("[second-opinion] GymMaster skipped: env vars not set");
  }

  return NextResponse.json({ ok: true });
}
