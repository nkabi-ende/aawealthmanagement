import { test } from "node:test";
import assert from "node:assert/strict";
import { IntakeInbox } from "../workers/zoho-intake/index.ts";
import { getCoverQuestions } from "../src/lib/intake.ts";
const data = {
  cover: "Life cover",
  answers: Object.fromEntries(getCoverQuestions("Life cover").map((q) => [q.key, q.options[0]])),
  name: "Test",
  phone: "+27821234567",
  email: "",
  province: "KwaZulu-Natal",
  preference: "WhatsApp",
  contactTime: "Any business-hour time",
  consent: true,
};
function setup() {
  const values = new Map<string, any>();
  let alarm = 0;
  const storage = {
    get: async (k: string) => values.get(k),
    put: async (k: string, v: any) => {
      values.set(k, structuredClone(v));
    },
    list: async () => new Map(values),
    delete: async (k: string) => values.delete(k),
    setAlarm: async (n: number) => {
      alarm = n;
    },
  };
  const inbox = new IntakeInbox({ storage, waitUntil: () => {} }, {} as any);
  const send = (reference: string, d = data) =>
    inbox.fetch(
      new Request("https://internal/intake", {
        method: "POST",
        body: JSON.stringify({ data: d, reference }),
      }),
    );
  return {
    values,
    send,
    get alarm() {
      return alarm;
    },
  };
}
test("receipt follows persistent storage; retry reuses job; changed payload is rejected", async () => {
  const s = setup();
  assert.equal((await s.send("AA-one")).status, 202);
  assert.equal(s.values.size, 1);
  assert.ok(s.alarm > Date.now());
  await s.send("AA-one");
  assert.equal(s.values.size, 1);
  assert.equal((await s.send("AA-one", { ...data, name: "Changed" })).status, 409);
});
test("per-phone limit caps new jobs while allowing idempotent retries", async () => {
  const s = setup();
  for (let i = 0; i < 5; i++) assert.equal((await s.send("AA-" + i)).status, 202);
  assert.equal((await s.send("AA-6")).status, 429);
  assert.equal((await s.send("AA-0")).status, 202);
});
