/** Server-side integration building block. Not an HTTP endpoint; never import into client code. */
import { validateIntake, formatIntakeMessage, type IntakeData } from "../src/lib/intake";
export type OdooConfig = {
  baseUrl: string;
  apiKey: string;
  database?: string;
  teamId: number;
  userId?: number;
};
const htmlEscape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
export function mapOdooOpportunity(
  data: IntakeData,
  reference: string,
  config: Pick<OdooConfig, "teamId" | "userId">,
  now = new Date(),
) {
  validateIntake(data);
  if (!/^AA-[A-Z0-9-]{8,64}$/.test(reference)) throw new Error("Invalid reference");
  if (!Number.isSafeInteger(config.teamId) || config.teamId <= 0)
    throw new Error("Sales team ID required");
  if (config.userId !== undefined && (!Number.isSafeInteger(config.userId) || config.userId <= 0))
    throw new Error("Invalid agent ID");
  return {
    name: `${reference} · ${data.cover} · ${data.name.trim()}`,
    type: "opportunity",
    contact_name: data.name.trim(),
    phone: data.phone.replace(/\s/g, ""),
    ...(data.email ? { email_from: data.email.trim() } : {}),
    team_id: config.teamId,
    ...(config.userId ? { user_id: config.userId } : { user_id: false }),
    description: `<p><strong>AA Wealth website intake · ${htmlEscape(reference)}</strong></p><p>${htmlEscape(formatIntakeMessage(data)).replace(/\n/g, "<br/>")}</p><p>Consent text version: aa-intake-v1<br/>Server received at: ${now.toISOString()}<br/>Source: AA Wealth website<br/>Quote and underwriting not yet completed.</p>`,
  };
}
export async function createOdooOpportunity(
  data: IntakeData,
  reference: string,
  config: OdooConfig,
  fetcher: typeof fetch = fetch,
) {
  if (typeof window !== "undefined") throw new Error("Server-only integration");
  const url = new URL(config.baseUrl);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  )
    throw new Error("Use an HTTPS Odoo origin");
  if (!config.apiKey?.trim()) throw new Error("Odoo API key missing");
  const values = mapOdooOpportunity(data, reference, config);
  const response = await fetcher(new URL("/json/2/crm.lead/create", url), {
    method: "POST",
    redirect: "error",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${config.apiKey}`,
      ...(config.database ? { "X-Odoo-Database": config.database } : {}),
    },
    body: JSON.stringify({ vals_list: [values] }),
    signal: AbortSignal.timeout(12000),
  });
  // Do not log Odoo error bodies: they can contain personal details or internal configuration.
  if (!response.ok) throw new Error(`Odoo lead creation failed (${response.status})`);
  const result = await response.json();
  const leadId = Array.isArray(result) ? result[0] : result;
  if (!Number.isSafeInteger(leadId) || leadId <= 0)
    throw new Error("Odoo did not confirm a lead ID");
  return { reference, leadId };
}
