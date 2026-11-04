export async function verifyTurnstile(token, ip) {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error("[turnstile] Missing TURNSTILE_SECRET_KEY");
    return false;
  }
  if (!token) {
    console.warn("[turnstile] No token submitted with request");
    return false;
  }

  const params = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  if (ip) params.append("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: params },
    );
    const data = await res.json();
    if (data.success !== true) {
      console.warn("[turnstile] Verification failed:", data["error-codes"] ?? data);
    }
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] Request to siteverify threw:", err);
    return false;
  }
}
