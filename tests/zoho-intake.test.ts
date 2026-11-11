import { test } from "node:test";
import assert from "node:assert/strict";
import {
  cleanIntake,
  contactFields,
  deliverToZoho,
  ReviewRequired,
} from "../workers/zoho-intake/zoho.ts";
import { COVER_OPTIONS, getCoverQuestions } from "../src/lib/intake.ts";
const sample = (cover = "Life cover") =>
  cleanIntake({
    cover,
    answers: Object.fromEntries(getCoverQuestions(cover).map((q) => [q.key, q.options[0]])),
    name: "Test Prospect",
    phone: "082 123 4567",
    email: "test@example.com",
    province: "KwaZulu-Natal",
    preference: "WhatsApp",
    contactTime: "Any business-hour time",
    consent: true,
  });
const config = { ZOHO_CLIENT_ID: "mock", ZOHO_CLIENT_SECRET: "mock", ZOHO_REFRESH_TOKEN: "mock" };
const ref = "AA-12345678-1234-1234-1234-123456789abc";
const date = "2026-11-11T00:00:00Z";
test("every product preserves its answers; no stale or arbitrary answers are accepted", () => {
  for (const cover of COVER_OPTIONS) {
    const d = sample(cover);
    assert.equal(contactFields(d, ref, date).Product_Interest, cover);
    assert.ok(contactFields(d, ref, date).Latest_Enquiry_Answers.includes(cover));
  }
  const d = sample();
  assert.equal(
    cleanIntake({ ...d, answers: { ...d.answers, medical: "private" } }).answers.medical,
    undefined,
  );
  assert.throws(() => cleanIntake({ ...d, consent: false }));
  assert.throws(() => cleanIntake({ ...d, province: "invalid" }));
  assert.throws(() => cleanIntake({ ...d, preference: "invalid" }));
  assert.throws(() => cleanIntake({ ...d, answers: {} }));
  assert.equal(d.phone, "+27821234567");
});
function mock(existing: Record<string, unknown>[] = [], noteExists = false) {
  const writes: { path: string; body: any }[] = [];
  const fetcher = async (input: any, init: any) => {
    const u = new URL(input);
    assert.equal(init.redirect, "manual");
    let data: any;
    if (u.hostname === "accounts.zoho.com")
      return Response.json({ access_token: "mock", api_domain: "https://www.zohoapis.com" });
    if (init.method === "POST") {
      writes.push({ path: u.pathname, body: JSON.parse(init.body) });
      data = [{ status: "success", details: { id: "12345" } }];
    } else if (u.pathname.endsWith("/search")) data = existing;
    else data = noteExists ? [{ Note_Title: "Website enquiry " + ref }] : [];
    return Response.json({ data });
  };
  return { writes, fetcher: fetcher as typeof fetch };
}
test("new contact includes all mapped fields and an enquiry note", async () => {
  const m = mock();
  const result = await deliverToZoho(sample(), ref, date, config, m.fetcher);
  assert.equal(result.contactId, "12345");
  assert.equal(m.writes.length, 2);
  assert.equal(m.writes[0].body.data[0].Customer_Status, "Prospect");
  assert.equal(m.writes[1].body.data[0].Note_Title, "Website enquiry " + ref);
});
test("repeat enquiry appends a note without modifying existing client identity, owner or status", async () => {
  const m = mock([
    {
      id: "222",
      Mobile: "0821234567",
      Email: "test@example.com",
      Customer_Status: "Active Policyholder",
    },
  ]);
  await deliverToZoho(sample(), ref, date, config, m.fetcher);
  assert.equal(m.writes.length, 1);
  assert.equal(m.writes[0].path, "/crm/v8/Contacts/222/Notes");
});
test("retry recognises an existing note; multiple matching contacts require review", async () => {
  const m = mock([{ id: "222", Mobile: "+27821234567", Email: "test@example.com" }], true);
  await deliverToZoho(sample(), ref, date, config, m.fetcher);
  assert.equal(m.writes.length, 0);
  const n = mock([
    { id: "1", Mobile: "+27821234567" },
    { id: "2", Email: "test@example.com" },
  ]);
  await assert.rejects(() => deliverToZoho(sample(), ref, date, config, n.fetcher), ReviewRequired);
  assert.equal(n.writes.length, 0);
});
test("approximate search results do not attach enquiry to the wrong contact", async () => {
  const m = mock([{ id: "777", Mobile: "+27829999999", Email: "test_example.com" }]);
  await deliverToZoho(sample(), ref, date, config, m.fetcher);
  assert.equal(m.writes.length, 2);
});
test("authentication failures and unconfirmed CRM writes never count as success", async () => {
  await assert.rejects(() =>
    deliverToZoho(sample(), ref, date, config, (async () =>
      Response.json({ error: "invalid_client" })) as typeof fetch),
  );
  const m = mock();
  await assert.rejects(() =>
    deliverToZoho(sample(), ref, date, config, (async (i: any, o: any) =>
      o?.method === "POST" && String(i).includes("/Contacts")
        ? Response.json({ data: [{ status: "error" }] })
        : m.fetcher(i, o)) as typeof fetch),
  );
});

test("redirects from token and CRM endpoints are rejected without following them", async () => {
  let requests = 0;
  const redirected = (async (_input: any, init: any) => {
    requests++;
    assert.equal(init.redirect, "manual");
    return new Response(null, { status: 302, headers: { Location: "https://example.com" } });
  }) as typeof fetch;
  await assert.rejects(() => deliverToZoho(sample(), ref, date, config, redirected), /Zoho authentication failed/);
  assert.equal(requests, 1);
  requests = 0;
  const crmRedirect = (async (_input: any, init: any) => {
    assert.equal(init.redirect, "manual");
    return ++requests === 1
      ? Response.json({ access_token: "mock", api_domain: "https://www.zohoapis.com" })
      : new Response(null, { status: 302 });
  }) as typeof fetch;
  await assert.rejects(() => deliverToZoho(sample(), ref, date, config, crmRedirect), /Zoho request failed 302/);
  assert.equal(requests, 2);
});
