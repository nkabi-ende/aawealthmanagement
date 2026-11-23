import assert from "node:assert/strict";
import test from "node:test";
import {
  buildAgentEnquiryMessage,
  buildBrokerEnquiryMessage,
  emailEnquiryUrl,
  whatsappEnquiryUrl,
} from "../src/lib/b2b-enquiry.ts";

test("broker enquiry includes a scoped package, leads and workflow context", () => {
  const message = buildBrokerEnquiryMessage({
    contactName: "Nandi",
    brokerage: "KZN Insurance Partners",
    teamSize: "6–20 agents",
    currentCrm: "Spreadsheets",
    packageName: "Growth Engine",
    priorities: ["CRM & lead routing", "Social media & campaigns"],
    primaryChallenge: "Slow lead follow-up",
  });
  assert.match(message, /Growth Engine/);
  assert.match(message, /CRM & lead routing/);
  assert.match(message, /Slow lead follow-up/);
  assert.match(whatsappEnquiryUrl(message), /^https:\/\/wa\.me\/27765885126\?text=/);
  assert.ok(decodeURIComponent(whatsappEnquiryUrl(message)).includes("KZN Insurance Partners"));
});

test("broker input is single-line normalised and optional fields are truthful", () => {
  const message = buildBrokerEnquiryMessage({
    contactName: "Ada\nInjected",
    brokerage: "",
    teamSize: "",
    currentCrm: "",
    packageName: "",
    priorities: [],
    primaryChallenge: "Need\nbetter lead routing",
  });
  assert.match(message, /Contact: Ada Injected/);
  assert.match(message, /Brokerage: Not supplied/);
  assert.match(message, /Service model: Help me choose/);
  assert.match(message, /Biggest challenge: Need better lead routing/);
  assert.ok(!message.includes("Contact: Ada\n"));
  const mail = emailEnquiryUrl("Broker enquiry\nBcc: fake@example.com", message);
  assert.match(mail, /^mailto:hello@aawealthmanagement\.co\.za\?subject=/);
  assert.ok(!decodeURIComponent(mail.split("&body=")[0]).includes("\n"));
});

test("agent enquiry distinguishes commission-only recruitment from a job offer", () => {
  const message = buildAgentEnquiryMessage({
    name: "Sipho",
    area: "Newlands West",
    experience: "Some field-sales experience",
    availability: "Immediately",
  });
  assert.match(message, /commission-only/);
  assert.match(message, /income is not guaranteed/);
  assert.match(message, /Newlands West/);
  assert.doesNotMatch(message, /You have been appointed/);
});
