/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Receives the portfolio contact form and emails it to you via Resend.
 * Configure these in Cloudflare Pages → Settings → Environment variables
 * (and in .dev.vars for local `wrangler pages dev`):
 *
 *   RESEND_API_KEY     required  Resend API key (re_...)
 *   CONTACT_TO         required  where messages are delivered (your inbox)
 *   CONTACT_FROM       optional  verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 *                                (defaults to Resend's test sender, which can only
 *                                 deliver to your own Resend account email)
 *   TURNSTILE_SECRET   optional  Cloudflare Turnstile secret; when set, every
 *                                submission must include a valid token
 */

const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

async function verifyTurnstile(secret, token, ip) {
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
  });
  const data = await res.json().catch(() => ({}));
  return data.success === true;
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
    return json({ ok: false, error: "Contact form is not configured." }, 500);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Pretend success for bots.
  if (typeof data.website === "string" && data.website.trim() !== "") return json({ ok: true });

  const field = (k) => (typeof data[k] === "string" ? data[k].trim() : "");
  const name = field("name");
  const email = field("email");
  const subject = field("subject") || "New message from your portfolio";
  const message = field("message");

  if (!name || !email || !message) return json({ ok: false, error: "Please fill in your name, email, and message." }, 400);
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "Please enter a valid email address." }, 400);
  for (const [k, max] of Object.entries(LIMITS)) {
    if (field(k).length > max) return json({ ok: false, error: `Your ${k} is too long.` }, 400);
  }

  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET, data.turnstileToken, request.headers.get("CF-Connecting-IP"));
    if (!ok) return json({ ok: false, error: "Spam check failed. Please try again." }, 400);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return json({ ok: false, error: "Couldn't send your message right now." }, 502);
  }
  return json({ ok: true });
}

// Anything other than POST
export const onRequest = () => json({ ok: false, error: "Method not allowed." }, 405);
