import { cleanIntake, deliverToZoho, ReviewRequired, type ZohoConfig } from "./zoho.ts";
import type { IntakeData } from "../../src/lib/intake.ts";
// Minimal platform contracts keep this separately deployed Worker independent of the website build.
type Storage = {
  get<T>(key: string): Promise<T | undefined>;
  put(key: string, value: unknown): Promise<void>;
  list<T>(opts: { prefix: string }): Promise<Map<string, T>>;
  delete(key: string): Promise<boolean>;
  setAlarm(time: number): Promise<void>;
};
type State = { storage: Storage; waitUntil(p: Promise<unknown>): void };
type Env = ZohoConfig & {
  ENABLED: string;
  TURNSTILE_SECRET: string;
  INTAKE: {
    idFromName(name: string): unknown;
    get(id: unknown): { fetch(request: Request): Promise<Response> };
  };
};
type Job = {
  data: IntakeData;
  reference: string;
  receivedAt: string;
  attempts: number;
  state: "queued" | "saved" | "review";
  completedAt?: number;
};
const origins = ["https://aawealthmanagement.co.za", "https://www.aawealthmanagement.co.za"];
const json = (data: unknown, status = 200, origin?: string) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...(origin ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
    },
  });
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    if (!origins.includes(origin)) return json({ error: "Origin not allowed" }, 403);
    if (request.method === "OPTIONS")
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
          Vary: "Origin",
        },
      });
    if (request.method !== "POST" || new URL(request.url).pathname !== "/api/intake")
      return json({ error: "Not found" }, 404, origin);
    if (
      env.ENABLED !== "true" ||
      !env.ZOHO_CLIENT_ID ||
      !env.ZOHO_CLIENT_SECRET ||
      !env.ZOHO_REFRESH_TOKEN ||
      !env.TURNSTILE_SECRET
    )
      return json({ error: "Online submission unavailable. Please use WhatsApp." }, 503, origin);
    // Enforce an actual stream limit, including requests with no Content-Length.
    const reader = request.body?.getReader();
    let size = 0;
    const chunks: Uint8Array[] = [];
    if (!reader) return json({ error: "Missing enquiry" }, 400, origin);
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 12000) {
        await reader.cancel();
        return json({ error: "Enquiry too large" }, 413, origin);
      }
      chunks.push(value);
    }
    let body: Record<string, unknown>;
    let data: IntakeData;
    try {
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const c of chunks) {
        bytes.set(c, offset);
        offset += c.length;
      }
      body = JSON.parse(new TextDecoder().decode(bytes));
      data = cleanIntake(body.data);
    } catch {
      return json({ error: "Please check your enquiry details." }, 400, origin);
    }
    if (
      typeof body.reference !== "string" ||
      !/^AA-[0-9a-f-]{36}$/.test(body.reference) ||
      typeof body.turnstileToken !== "string" ||
      body.turnstileToken.length > 2048
    )
      return json({ error: "Invalid submission" }, 400, origin);
    let verification: { success?: boolean; hostname?: string; action?: string };
    try {
      const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: body.turnstileToken,
          remoteip: request.headers.get("CF-Connecting-IP") || "",
        }),
        signal: AbortSignal.timeout(10000),
      });
      verification = await check.json();
    } catch {
      return json({ error: "Verification unavailable. Please retry." }, 503, origin);
    }
    if (
      !verification.success ||
      !["aawealthmanagement.co.za", "www.aawealthmanagement.co.za"].includes(
        verification.hostname || "",
      ) ||
      verification.action !== "intake"
    )
      return json({ error: "Please complete verification again." }, 400, origin);
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data.phone));
    const key = Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
    try {
      const stub = env.INTAKE.get(env.INTAKE.idFromName(key));
      const result = await stub.fetch(
        new Request("https://internal/intake", {
          method: "POST",
          body: JSON.stringify({ data, reference: body.reference }),
        }),
      );
      return json(await result.json(), result.status, origin);
    } catch {
      return json(
        {
          error:
            "We could not confirm receipt. Please retry with the same enquiry or use WhatsApp.",
        },
        503,
        origin,
      );
    }
  },
};
export class IntakeInbox {
  private chain: Promise<unknown> = Promise.resolve();
  constructor(
    private ctx: State,
    private env: Env,
  ) {}
  private exclusive<T>(fn: () => Promise<T>): Promise<T> {
    const next = this.chain.then(fn, fn);
    this.chain = next.catch(() => {});
    return next;
  }
  async fetch(request: Request): Promise<Response> {
    return this.exclusive(async () => {
      const { data, reference } = (await request.json()) as { data: IntakeData; reference: string };
      const key = "job:" + reference;
      const existing = await this.ctx.storage.get<Job>(key);
      if (existing) {
        if (JSON.stringify(existing.data) !== JSON.stringify(data))
          return json({ error: "Reference already used for another enquiry" }, 409);
        return json({ reference, state: existing.state }, existing.state === "saved" ? 200 : 202);
      }
      const jobs = await this.ctx.storage.list<Job>({ prefix: "job:" });
      if (
        [...jobs.values()].filter((j) => Date.now() - Date.parse(j.receivedAt) < 86400000).length >=
        5
      )
        return json(
          { error: "Please contact AA Wealth directly for further enquiries today." },
          429,
        );
      // Alarm first: a crash before writing the job only causes a harmless empty wake-up.
      await this.ctx.storage.setAlarm(Date.now() + 1000);
      await this.ctx.storage.put(key, {
        data,
        reference,
        receivedAt: new Date().toISOString(),
        attempts: 0,
        state: "queued",
      } satisfies Job);
      return json({ reference, state: "queued" }, 202);
    });
  }
  async alarm(): Promise<void> {
    return this.exclusive(async () => {
      let pending = false;
      for (const [key, job] of await this.ctx.storage.list<Job>({ prefix: "job:" })) {
        if (job.state !== "queued") {
          // Retain synced enquiries for 30 days to recognise retries, then delete the local copy.
          if (job.completedAt && Date.now() - job.completedAt > 30 * 86400000)
            await this.ctx.storage.delete(key);
          continue;
        }
        try {
          await deliverToZoho(job.data, job.reference, job.receivedAt, this.env);
          job.state = "saved";
          job.completedAt = Date.now();
        } catch (error) {
          job.attempts++;
          if (error instanceof ReviewRequired || job.attempts >= 12) {
            job.state = "review";
            console.error("Zoho intake needs operator review", { reference: job.reference });
          } else pending = true;
        }
        await this.ctx.storage.put(key, job);
      }
      // Daily receipt cleanup, or five-minute delivery retry. Pending review is retained for the operator.
      await this.ctx.storage.setAlarm(Date.now() + (pending ? 300000 : 86400000));
    });
  }
}
