import { describe, it, expect } from "bun:test";
import {
  COVER_OPTIONS,
  getCoverQuestions,
  formatIntakeMessage,
  validateIntake,
  type IntakeData,
} from "../src/lib/intake";
import { createOdooOpportunity, mapOdooOpportunity } from "../integrations/odoo";
const sample = (cover = "Life cover"): IntakeData => ({
  cover,
  answers: Object.fromEntries(getCoverQuestions(cover).map((q) => [q.key, q.options[0]])),
  name: "Test Prospect",
  phone: "082 123 4567",
  email: "test@example.com",
  province: "KwaZulu-Natal",
  preference: "Phone call",
  contactTime: "Morning (08:00–12:00)",
  consent: true,
});
describe("adaptive intake", () => {
  it("supports every cover path and only includes relevant answers", () => {
    for (const cover of COVER_OPTIONS) {
      const d = sample(cover);
      expect(() => validateIntake(d)).not.toThrow();
      expect(formatIntakeMessage(d)).toContain(cover);
      expect(getCoverQuestions(cover).length).toBeGreaterThan(0);
    }
    expect(getCoverQuestions("Group & stokvel").some((q) => q.key === "age")).toBe(false);
  });
  it("requires consent and complete, valid answers", () => {
    expect(() => validateIntake({ ...sample(), consent: false })).toThrow();
    expect(() => validateIntake({ ...sample(), answers: {} })).toThrow();
    expect(() => validateIntake({ ...sample(), phone: "082123456789" })).toThrow();
    expect(() => validateIntake({ ...sample(), name: "  " })).toThrow();
  });
  it("excludes stale irrelevant answer values", () => {
    expect(
      formatIntakeMessage({
        ...sample(),
        answers: { ...sample().answers, medical: "DO NOT INCLUDE" },
      }),
    ).not.toContain("DO NOT INCLUDE");
  });
});
describe("Odoo adapter (mocked, no live CRM writes)", () => {
  it("escapes HTML and uses server-controlled routing", () => {
    const v = mapOdooOpportunity(
      { ...sample(), name: "<script>alert(1)</script>" },
      "AA-TEST12345",
      { teamId: 4, userId: 7 },
    );
    expect(v.description).not.toContain("<script>");
    expect(v.description).toContain("&lt;script&gt;");
    expect(v.team_id).toBe(4);
    expect(v.user_id).toBe(7);
    expect(v.phone).toBe("0821234567");
  });
  it("sends JSON-2 securely and requires a confirmed CRM ID", async () => {
    let request: any;
    const fake = async (url: any, init: any) => {
      request = { url: String(url), ...init };
      return new Response(JSON.stringify([17]), { status: 200 });
    };
    const result = await createOdooOpportunity(
      sample(),
      "AA-TEST12345",
      { baseUrl: "https://example.odoo.com", apiKey: "test-only-key", teamId: 4 },
      fake as typeof fetch,
    );
    expect(result.leadId).toBe(17);
    expect(request.url).toEndWith("/json/2/crm.lead/create");
    expect(JSON.parse(request.body).vals_list[0].type).toBe("opportunity");
    expect(request.redirect).toBe("error");
  });
  it("rejects missing configuration before sending and surfaces failures", async () => {
    const config = { baseUrl: "https://example.odoo.com", apiKey: "test-only-key", teamId: 4 };
    await expect(
      createOdooOpportunity(sample(), "AA-TEST12345", { ...config, apiKey: "" }),
    ).rejects.toThrow();
    await expect(
      createOdooOpportunity(
        sample(),
        "AA-TEST12345",
        config,
        (async () => new Response("Error", { status: 503 })) as typeof fetch,
      ),
    ).rejects.toThrow();
    await expect(
      createOdooOpportunity(
        sample(),
        "AA-TEST12345",
        config,
        (async () => new Response("{}")) as typeof fetch,
      ),
    ).rejects.toThrow();
  });
});
