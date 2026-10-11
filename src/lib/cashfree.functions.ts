import { createServerFn } from "@tanstack/react-start";

const PRICE_PER_CLASS_INR = 1500;

type Input = { classIds: string[]; customer: { name: string; phone: string; email: string } };

export const createCashfreeOrder = createServerFn({ method: "POST" })
  .inputValidator((d: Input) => {
    if (!Array.isArray(d?.classIds) || d.classIds.length === 0 || d.classIds.length > 20) throw new Error("Select at least one class");
    const phone = String(d.customer?.phone ?? "").replace(/\D/g, "").slice(-10);
    if (phone.length !== 10) throw new Error("Enter a valid 10-digit phone number");
    return {
      classIds: d.classIds.map((x) => String(x).replace(/[^a-z0-9]/gi, "").slice(0, 8)).filter(Boolean),
      customer: {
        name: String(d.customer?.name ?? "").slice(0, 80) || "Kasratshala Student",
        phone,
        email: String(d.customer?.email ?? "").slice(0, 120) || "student@kasratshala.in",
      },
    };
  })
  .handler(async ({ data }) => {
    const id = process.env.CASHFREE_CLIENT_ID;
    const secret = process.env.CASHFREE_CLIENT_SECRET;
    if (!id || !secret) return { ok: false as const, reason: "not_configured" };
    const mode = process.env.CASHFREE_MODE === "production" ? "production" : "sandbox";
    const base = mode === "production" ? "https://api.cashfree.com" : "https://sandbox.cashfree.com";
    const res = await fetch(`${base}/pg/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-client-id": id,
        "x-client-secret": secret,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify({
        order_amount: data.classIds.length * PRICE_PER_CLASS_INR,
        order_currency: "INR",
        order_note: `Kasratshala batches: ${data.classIds.join(",")}`,
        customer_details: {
          customer_id: `ks_${data.customer.phone}`,
          customer_name: data.customer.name,
          customer_phone: data.customer.phone,
          customer_email: data.customer.email,
        },
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { payment_session_id?: string; message?: string };
    if (!res.ok || !json.payment_session_id) return { ok: false as const, reason: json.message ?? "order_failed" };
    return { ok: true as const, sessionId: json.payment_session_id, mode };
  });
