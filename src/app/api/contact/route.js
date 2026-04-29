import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const MAX_LEN = {
  firstName: 120,
  lastName: 120,
  email: 320,
  phone: 40,
  interest: 120,
  goals: 8000,
};

function hasText(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function trimmedOrEmpty(v) {
  return typeof v === "string" ? v.trim() : "";
}

function simpleEmailOk(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const firstName = trimmedOrEmpty(body?.firstName);
  const lastName = trimmedOrEmpty(body?.lastName);
  const email = trimmedOrEmpty(body?.email);
  const phone = trimmedOrEmpty(body?.phone);
  const interest = trimmedOrEmpty(body?.interest);
  const goals = trimmedOrEmpty(body?.goals);

  if (
    firstName.length > MAX_LEN.firstName ||
    lastName.length > MAX_LEN.lastName ||
    email.length > MAX_LEN.email ||
    phone.length > MAX_LEN.phone ||
    interest.length > MAX_LEN.interest ||
    goals.length > MAX_LEN.goals
  ) {
    return NextResponse.json(
      { error: "One or more fields are too long." },
      { status: 400 },
    );
  }

  if (
    !hasText(firstName) ||
    !hasText(lastName) ||
    !hasText(email) ||
    !simpleEmailOk(email)
  ) {
    return NextResponse.json(
      { error: "Please enter a valid name and email." },
      { status: 400 },
    );
  }

  if (!interest) {
    return NextResponse.json(
      { error: "Please select an area of interest." },
      { status: 400 },
    );
  }

  const name = `${firstName} ${lastName}`.trim();

  const supabaseUrl =
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_SUPABASE_URL
      : null;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[contact] Missing NEXT_PUBLIC_SUPABASE_URL or ANON_KEY");
    return NextResponse.json(
      { error: "Server misconfiguration. Please try again later." },
      { status: 500 },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name,
    email,
    phone,
    interest,
    goals,
  });

  if (dbError) {
    console.error("[contact] Supabase insert failed:", dbError.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  const baseUrl = process.env.GYMMASTER_BASE_URL?.trim();
  const apiKey = process.env.GYMMASTER_API_KEY?.trim();
  const companyId = process.env.GYMMASTER_COMPANY_ID?.trim();

  if (baseUrl && apiKey && companyId) {
    const normalizedBase = baseUrl.replace(/\/+$/, "");
    const prospectUrl = `${normalizedBase}/portal/api/v1/prospect/create`;

    const notesParts = [
      "Source: Website contact form",
      `Interest: ${interest}`,
    ];
    if (goals) notesParts.push(`Goals & limitations: ${goals}`);
    const notes = notesParts.join("\n");

    const formData = new FormData();
    formData.append("api_key", apiKey);
    formData.append("firstname", firstName);
    formData.append("surname", lastName);
    formData.append("email", email);
    formData.append("companyid", companyId);
    formData.append("notes", notes);
    if (phone) formData.append("phonecell", phone);

    try {
      const gmRes = await fetch(prospectUrl, { method: "POST", body: formData });

      let gmJson = null;
      const text = await gmRes.text();
      try {
        gmJson = text ? JSON.parse(text) : null;
      } catch {
        gmJson = null;
      }

      const gmError =
        !gmJson || typeof gmJson !== "object"
          ? !gmRes.ok
            ? text || gmRes.statusText
            : null
          : gmJson.error && String(gmJson.error).length > 0
            ? String(gmJson.error)
            : !gmRes.ok
              ? text || gmRes.statusText
              : null;

      if (gmError) {
        console.error("[contact] GymMaster prospect/create:", gmError);
      }
    } catch (err) {
      console.error("[contact] GymMaster request failed:", err);
    }
  } else {
    console.warn(
      "[contact] GymMaster skipped: set GYMMASTER_BASE_URL, GYMMASTER_API_KEY, and GYMMASTER_COMPANY_ID",
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you — your message was received. Our team will be in touch soon.",
  });
}
