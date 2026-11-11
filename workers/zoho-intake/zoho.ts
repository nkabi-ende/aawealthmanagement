import {
  formatIntakeMessage,
  getCoverQuestions,
  validateIntake,
  type IntakeData,
} from "../../src/lib/intake.ts";
export type ZohoConfig = {
  ZOHO_CLIENT_ID: string;
  ZOHO_CLIENT_SECRET: string;
  ZOHO_REFRESH_TOKEN: string;
  ZOHO_OWNER_ID?: string;
};
export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return "+" + (digits.startsWith("0") ? "27" + digits.slice(1) : digits);
}
export function cleanIntake(input: unknown): IntakeData {
  if (!input || typeof input !== "object") throw new Error("Invalid enquiry");
  const v = input as Record<string, unknown>;
  for (const k of ["cover", "name", "phone", "email", "province", "preference", "contactTime"]) {
    if (typeof v[k] !== "string" || (v[k] as string).length > 255)
      throw new Error("Invalid enquiry");
  }
  if (v.consent !== true) throw new Error("Consent required");
  if (!v.answers || typeof v.answers !== "object" || Array.isArray(v.answers))
    throw new Error("Invalid answers");
  const answers = Object.fromEntries(
    getCoverQuestions(v.cover as string).map((q) => [
      q.key,
      (v.answers as Record<string, string>)[q.key],
    ]),
  );
  const data = { ...v, answers } as IntakeData;
  validateIntake(data);
  if (data.email.length > 100) throw new Error("Email exceeds CRM limit");
  if (
    !["WhatsApp", "Phone call"].includes(data.preference) ||
    !["Any business-hour time", "Morning (08:00–12:00)", "Afternoon (12:00–17:00)"].includes(
      data.contactTime,
    )
  )
    throw new Error("Invalid preference");
  if (
    ![
      "KwaZulu-Natal",
      "Gauteng",
      "Western Cape",
      "Eastern Cape",
      "Free State",
      "Limpopo",
      "Mpumalanga",
      "North West",
      "Northern Cape",
    ].includes(data.province)
  )
    throw new Error("Invalid province");
  return {
    cover: data.cover,
    answers,
    name: data.name.trim(),
    phone: normalizePhone(data.phone),
    email: data.email.trim().toLowerCase(),
    province: data.province,
    preference: data.preference,
    contactTime: data.contactTime,
    consent: true,
  };
}
export function contactFields(data: IntakeData, reference: string, receivedAt: string) {
  const a = data.answers;
  return {
    Last_Name: data.name.slice(0, 80),
    Website_Full_Name: data.name,
    Mobile: data.phone,
    ...(data.email ? { Email: data.email } : {}),
    Mailing_Country: "South Africa",
    Mailing_State: data.province,
    Customer_Status: "Prospect",
    Product_Interest: data.cover,
    Age_Range: a.age || "",
    Employment_Status: a.work || "",
    Monthly_Budget_Range: a.budget || "",
    Existing_Cover_Details: a.existing || "",
    Cover_Amount_Range: a.amount || "",
    Family_Cover_Scope: a.family || "",
    Group_Type: a.group || "",
    Group_Member_Range: a.members || "",
    Enquiry_Goal: a.goal || "",
    Enquiry_Priority: a.priority || "",
    Preferred_Contact_Method: data.preference,
    Preferred_Callback_Time: data.contactTime,
    Enquiry_Consent: true,
    Consent_Version: "aa-intake-v2-zoho",
    Enquiry_Received_At: receivedAt,
    Latest_Enquiry_ID: reference,
    Latest_Enquiry_Answers: formatIntakeMessage(data),
  };
}
export class ReviewRequired extends Error {}
export async function deliverToZoho(
  data: IntakeData,
  reference: string,
  receivedAt: string,
  config: ZohoConfig,
  fetcher: typeof fetch = fetch,
) {
  let stage = "token_refresh";
  try {
  const tokenResponse = await fetcher("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    redirect: "manual",
    signal: AbortSignal.timeout(12000),
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: config.ZOHO_CLIENT_ID,
      client_secret: config.ZOHO_CLIENT_SECRET,
      refresh_token: config.ZOHO_REFRESH_TOKEN,
    }),
  });
  if (!tokenResponse.ok) throw new Error("Zoho authentication failed");
  const token = (await tokenResponse.json()) as { access_token?: string; api_domain?: string };
  if (!tokenResponse.ok || !token.access_token || token.api_domain !== "https://www.zohoapis.com")
    throw new Error("Zoho authentication failed");
  const api = async (path: string, body?: unknown) => {
    stage = path.startsWith("Contacts/search?") ? "contact_lookup"
      : path === "Contacts" ? "contact_create"
      : body ? "note_create" : "note_lookup";
    const response = await fetcher("https://www.zohoapis.com/crm/v8/" + path, {
      method: body ? "POST" : "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(12000),
      headers: {
        Authorization: "Zoho-oauthtoken " + token.access_token,
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    if (response.status === 204)
      return { data: [] } as { data: Record<string, any>[]; info?: { more_records: boolean } };
    if (!response.ok) {
      let failure: any;
      try { failure = await response.json(); } catch { failure = {}; }
      const item = failure.data?.[0] || failure;
      const allowedCodes = ["INVALID_DATA", "INVALID_QUERY", "EXPECTED_PARAM_MISSING", "MANDATORY_NOT_FOUND",
        "REQUIRED_PARAM_MISSING", "LIMIT_REACHED", "NOT_SUPPORTED", "INVALID_REQUEST_METHOD",
        "AUTHORIZATION_FAILED", "OAUTH_SCOPE_MISMATCH", "NO_PERMISSION", "INVALID_URL_PATTERN",
        "DUPLICATE_DATA", "INVALID_TOKEN", "INTERNAL_ERROR"];
      const allowedFields = ["Last_Name", "Mobile", "Email", "Mailing_Country", "Mailing_State",
        "Customer_Status", "Enquiry_Received_At", "Owner", "Note_Title", "Note_Content",
        "Parent_Id", "Website_Full_Name", "Latest_Enquiry_ID", "Latest_Enquiry_Answers"];
      console.warn("Zoho CRM rejected request", {
        stage, status: response.status,
        code: allowedCodes.includes(item.code) ? item.code : "UNRECOGNISED",
        field: allowedFields.includes(item.details?.api_name) ? item.details.api_name : "unspecified",
      });
      throw new Error("Zoho request failed " + response.status);
    }
    return (await response.json()) as {
      data: Record<string, any>[];
      info?: { more_records: boolean };
    };
  };
  // Search is approximate in Zoho. Compare normalized values before accepting any match.
  const matches = new Map<string, Record<string, any>>();
  for (const [key, value] of [
    ["phone", data.phone],
    ...(data.email ? [["email", data.email]] : []),
  ]) {
    const result = await api(
      "Contacts/search?" + new URLSearchParams({ [key]: value, per_page: "200" }),
    );
    if (result.info?.more_records) throw new ReviewRequired("Too many matches");
    for (const c of result.data || []) {
      if (
        (key === "phone" &&
          [c.Mobile, c.Phone].some(
            (p) => typeof p === "string" && normalizePhone(p) === data.phone,
          )) ||
        (key === "email" && typeof c.Email === "string" && c.Email.toLowerCase() === data.email)
      )
        matches.set(c.id, c);
    }
  }
  if (matches.size > 1) throw new ReviewRequired("Contact match needs review");
  let contactId = matches.keys().next().value as string | undefined;
  if (!contactId) {
    const created = await api("Contacts", {
      data: [
        {
          ...contactFields(data, reference, receivedAt),
          ...(config.ZOHO_OWNER_ID ? { Owner: { id: config.ZOHO_OWNER_ID } } : {}),
        },
      ],
      trigger: [],
    });
    const item = created.data?.[0];
    if (item?.status !== "success" || !/^\d+$/.test(item.details?.id))
      throw new Error("Zoho did not confirm contact");
    contactId = item.details.id;
  }
  // Existing contact identity/status/owner are never overwritten by a public form.
  // Every enquiry becomes a separate dated Note, including repeat product enquiries.
  const title = "Website enquiry " + reference;
  let exists = false;
  for (let page = 1; page <= 20; page++) {
    const notes = await api(
      "Contacts/" +
        contactId +
        "/Notes?" +
        new URLSearchParams({ fields: "Note_Title", per_page: "200", page: String(page) }),
    );
    exists = notes.data?.some((n) => n.Note_Title === title) || false;
    if (exists || !notes.info?.more_records) break;
    if (page === 20) throw new ReviewRequired("Enquiry history needs review");
  }
  if (!exists) {
    const notes = await api("Contacts/" + contactId + "/Notes", {
      data: [
        {
          Note_Title: title,
          Note_Content:
            formatIntakeMessage(data) +
            "\nReceived: " +
            receivedAt +
            "\nConsent version: aa-intake-v2-zoho\nSource: AA Wealth website",
        },
      ],
    });
    if (notes.data?.[0]?.status !== "success") throw new Error("Zoho did not confirm enquiry note");
  }
  return { contactId };
  } catch (error) {
    // Emit only controlled stages and error categories; upstream bodies may contain secrets or PII.
    if (error instanceof ReviewRequired ||
        (error instanceof Error && /^(Zoho authentication failed|Zoho request failed [0-9]{3}|Zoho did not confirm contact|Zoho did not confirm enquiry note)$/.test(error.message)))
      throw error;
    const name = error instanceof Error &&
      ["TypeError", "SyntaxError", "AbortError", "TimeoutError", "RangeError"].includes(error.name)
      ? error.name : "RuntimeError";
    throw new Error("Zoho delivery failed at " + stage + ": " + name);
  }
}
