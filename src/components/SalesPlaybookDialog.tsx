import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ClipboardCheck,
  Laptop2, MapPinned, ShieldCheck, X,
} from "lucide-react";

type GuideStep = {
  label: string;
  title: string;
  goal: string;
  actions: readonly string[];
  example: string;
  check: string;
};

type Track = { id: "field" | "digital"; title: string; kicker: string; intro: string; steps: readonly GuideStep[] };

const tracks: readonly Track[] = [
  {
    id: "field",
    title: "Field Sales",
    kicker: "Face-to-face / community distribution",
    intro: "A responsible conversation from introduction through needs review and authorised handover.",
    steps: [
      {
        label: "Prepare",
        title: "Know the customer context.",
        goal: "Arrive with an approved purpose, useful materials and a clear plan for the conversation.",
        actions: [
          "Check the relevant product material, eligibility, premiums and current insurer-approved wording.",
          "Confirm territory, appointment or venue arrangements and carry appropriate FSP identification.",
          "Know the secure route for escalating questions, suitability assessments and complaints.",
        ],
        example: "Before the visit: What am I authorised to discuss, and who handles a detailed recommendation?",
        check: "No unapproved product statements, income claims or insurer branding.",
      },
      {
        label: "Approach",
        title: "Open with permission.",
        goal: "Start an honest, pressure-free conversation and give the customer room to decline.",
        actions: [
          "Introduce yourself, your role and your brokerage accurately.",
          "Explain the purpose of the conversation in plain language, in the customer's preferred language where practical.",
          "Seek permission to continue; record any refusal or follow-up preference.",
        ],
        example: "Good day. I'm [name] with [brokerage]. We help families review their protection options. Is now a suitable time to ask a few questions?",
        check: "Never suggest that cover or approval is automatic, compulsory or guaranteed.",
      },
      {
        label: "Discover",
        title: "Review before recommending.",
        goal: "Understand the customer's priorities without steering them toward unnecessary replacement.",
        actions: [
          "Ask what cover they already have, who relies on them and what monthly budget is comfortable.",
          "Identify questions about exclusions, waiting periods, benefit levels and claims.",
          "Do not request identity documents or sensitive medical information in informal chats.",
        ],
        example: "What protection do you already have, and what would you want your family to be able to manage if something happened?",
        check: "Do not encourage cancelling existing cover before a proper comparison.",
      },
      {
        label: "Handover",
        title: "Make the next step clear.",
        goal: "Route the conversation to the appropriate authorised person and approved application process.",
        actions: [
          "Summarise the customer's expressed needs, questions and preferred follow-up method.",
          "Obtain the appropriate permission for contact and record only the necessary information.",
          "Refer advice, quotations and disclosures to appropriately authorised people and channels.",
        ],
        example: "I'll arrange for the authorised advisor to review the available options and explain the costs and conditions before you decide.",
        check: "No personal promises about acceptance, premiums or claim payment dates.",
      },
      {
        label: "Follow up",
        title: "Stay useful after the meeting.",
        goal: "Close the loop on questions, documents and handovers.",
        actions: [
          "Log the visit, next action, responsible person and contact preference.",
          "Use approved secure channels for application details and documentation.",
          "Direct claims and policy-service requests to the correct insurer or servicing team.",
        ],
        example: "Thank you for speaking with us. I'll follow up about [agreed next step] using [agreed channel].",
        check: "Respect opt-outs and avoid repeated, unsolicited follow-up.",
      },
      {
        label: "Review",
        title: "Improve the field operation.",
        goal: "Use activity evidence to improve customer experience and operational controls.",
        actions: [
          "Track visits, permissioned follow-ups, qualified enquiries, submissions and unresolved cases.",
          "Review incomplete applications and sales-to-policy reconciliation exceptions.",
          "Escalate disputed identity information, unusual patterns and complaints through the broker's controls.",
        ],
        example: "Weekly team review: Which customer questions remain unanswered, and which handovers were not completed?",
        check: "Good sales practice includes reconciliation, quality and client outcomes—not just volumes.",
      },
    ],
  },
  {
    id: "digital",
    title: "Digital Sales",
    kicker: "Website / campaigns / CRM / WhatsApp",
    intro: "A measurable, consent-aware journey from the first digital touchpoint to advisor follow-up.",
    steps: [
      {
        label: "Position",
        title: "Lead with a real need.",
        goal: "Match the message to a clear audience and approved insurance proposition.",
        actions: [
          "Define the audience and the customer problem for each campaign or landing page.",
          "Review product claims, exclusions and insurer material before publishing.",
          "Use a relevant landing page rather than sending every campaign to a generic home page.",
        ],
        example: "Campaign direction: Understand what your existing funeral or life cover includes before changing your plan.",
        check: "Avoid fear-driven messaging, misleading savings claims and promised payouts.",
      },
      {
        label: "Capture",
        title: "Make the enquiry simple.",
        goal: "Collect just enough data for a useful follow-up.",
        actions: [
          "Offer a clear call to action with a short mobile-friendly form or WhatsApp route.",
          "Record source and consent or contact permission where required.",
          "Keep sensitive personal, identity and medical information out of open marketing forms.",
        ],
        example: "Form prompt: What would you like us to help you review? An advisor can discuss the details with you.",
        check: "Tell the visitor what happens after sending and do not claim a message was saved before confirmation.",
      },
      {
        label: "Route",
        title: "Give every lead an owner.",
        goal: "Reduce missed enquiries across channels.",
        actions: [
          "Deduplicate contacts and preserve campaign attribution where possible.",
          "Allocate enquiries to a suitable agent or servicing queue under the FSP's operating model.",
          "Use reminders, exception alerts and an internal response-time target appropriate to staffing.",
        ],
        example: "CRM next action: Assign owner, record source and contact preference, set follow-up task.",
        check: "Only authorised staff should access relevant lead and customer records.",
      },
      {
        label: "Qualify",
        title: "Have a useful first conversation.",
        goal: "Understand intent before transferring to a quote or advice process.",
        actions: [
          "Confirm the enquiry, contact permission and preferred channel.",
          "Ask what cover the prospect already has and which concern matters most.",
          "Capture questions and a next action without making an unsuitable product recommendation.",
        ],
        example: "Thanks for enquiring about [topic]. Would you like us to review your existing cover first, or discuss a new protection need?",
        check: "Disclosures and regulated advice must come from appropriately authorised people.",
      },
      {
        label: "Convert",
        title: "Make the handoff frictionless.",
        goal: "Help the prospect reach an informed decision rather than forcing a quick submission.",
        actions: [
          "Use approved quote and application processes, confirming terms and relevant waiting periods.",
          "Document questions, handovers and customer consent in the CRM.",
          "Use approved, secure channels for personal documents and application verification.",
        ],
        example: "Here is the next step: an authorised advisor will explain the options, premiums and conditions before you choose.",
        check: "Do not treat a form completion or quote request as policy activation.",
      },
      {
        label: "Optimise",
        title: "Measure quality, not vanity.",
        goal: "Understand which campaigns, processes and follow-ups genuinely serve prospects.",
        actions: [
          "Review source-to-enquiry, enquiry-to-contact, quote-to-submission and unresolved follow-ups.",
          "Investigate slow response times and high-friction pages before increasing ad spend.",
          "Feed real customer questions back into compliant content and team coaching.",
        ],
        example: "Weekly review: Which sources create qualified conversations, and where do enquiries stop progressing?",
        check: "Report outcomes accurately; separate marketing metrics from issued-policy data.",
      },
    ],
  },
];

export default function SalesPlaybookDialog() {
  const [open, setOpen] = useState(false);
  const [trackId, setTrackId] = useState<Track["id"]>("field");
  const [stepIndex, setStepIndex] = useState(0);
  const track = tracks.find((item) => item.id === trackId) ?? tracks[0];
  const step = track.steps[stepIndex] ?? track.steps[0];

  const changeTrack = (id: Track["id"]) => {
    setTrackId(id);
    setStepIndex(0);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className="btn btn-gold playbook-launch-btn">
          Open sales playbook <BookOpen size={17} aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="playbook-overlay" />
        <Dialog.Content className="playbook-dialog" aria-describedby="playbook-desc">
          <header className="playbook-header">
            <div className="playbook-brand">
              <span className="playbook-brand-mark" aria-hidden="true">
                <svg viewBox="0 0 34 34" fill="none" width="34" height="34">
                  <path d="M5 24L17 8l12 16" stroke="#E4C277" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M10 26L17 16l7 10" stroke="#13A079" strokeWidth="2.5" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <span className="playbook-brand-name">AA Wealth <span>Management</span></span>
                <span className="playbook-brand-kicker">BROKER SALES / FIELD GUIDE</span>
              </div>
            </div>
            <Dialog.Close className="playbook-close" aria-label="Close sales playbook">
              <X size={21} aria-hidden="true" />
            </Dialog.Close>
          </header>

          <div className="playbook-inner">
            <div className="playbook-intro">
              <div>
                <p className="playbook-eyebrow">SALES ENABLEMENT · TWO CHANNELS</p>
                <Dialog.Title>One standard. <em>Every conversation.</em></Dialog.Title>
                <Dialog.Description id="playbook-desc">
                  A practical AA Wealth-styled reference for broker teams managing field and digital
                  insurance enquiries.
                </Dialog.Description>
              </div>
              <div className="playbook-edition"><ShieldCheck size={16} aria-hidden="true" /> Working guide · not accredited training</div>
            </div>

            <div className="playbook-track-tabs" role="group" aria-label="Sales channel">
              <button
                id="playbook-tab-field"
                type="button"
                aria-pressed={trackId === "field"}
                onClick={() => changeTrack("field")}
              >
                <MapPinned size={19} aria-hidden="true" /><span><strong>Field sales</strong><small>Community & face-to-face</small></span>
              </button>
              <button
                id="playbook-tab-digital"
                type="button"
                aria-pressed={trackId === "digital"}
                onClick={() => changeTrack("digital")}
              >
                <Laptop2 size={19} aria-hidden="true" /><span><strong>Digital sales</strong><small>Marketing & lead operations</small></span>
              </button>
            </div>

            <div className="playbook-workspace" id="playbook-panel" aria-live="polite">
              <aside className="playbook-contents">
                <p>THE {track.title.toUpperCase()} JOURNEY</p>
                <nav aria-label={track.title + " playbook steps"}>
                  {track.steps.map((item, index) => (
                    <button
                      type="button"
                      key={item.label}
                      className={index === stepIndex ? "is-active" : ""}
                      onClick={() => setStepIndex(index)}
                      aria-current={index === stepIndex ? "step" : undefined}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
                    </button>
                  ))}
                </nav>
                <p className="playbook-side-footnote">AA WEALTH · FSP 50739</p>
              </aside>

              <article className="playbook-step-content" key={track.id + "-" + stepIndex}>
                <p className="playbook-step-count">
                  {track.kicker} <span>STEP {String(stepIndex + 1).padStart(2, "0")} / 06</span>
                </p>
                <h3>{step.title}</h3>
                <p className="playbook-step-goal">{step.goal}</p>
                <div className="playbook-action-title"><ClipboardCheck size={18} aria-hidden="true" /> IN PRACTICE</div>
                <ul className="playbook-actions">
                  {step.actions.map((action) => <li key={action}><CheckCircle2 size={16} aria-hidden="true" />{action}</li>)}
                </ul>
                <div className="playbook-script">
                  <span>USEFUL CONVERSATION PROMPT</span>
                  <p>{step.example}</p>
                </div>
                <div className="playbook-check"><ShieldCheck size={16} aria-hidden="true" /><p><strong>Compliance checkpoint:</strong> {step.check}</p></div>
                <div className="playbook-step-nav">
                  <button
                    type="button"
                    disabled={stepIndex === 0}
                    onClick={() => setStepIndex((index) => Math.max(0, index - 1))}
                  >
                    <ArrowLeft size={16} aria-hidden="true" /> Previous
                  </button>
                  {stepIndex < track.steps.length - 1 ? (
                    <button type="button" onClick={() => setStepIndex((index) => Math.min(track.steps.length - 1, index + 1))}>
                      Next step <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  ) : (
                    <button type="button" onClick={() => changeTrack(trackId === "field" ? "digital" : "field")}>
                      Explore {trackId === "field" ? "digital" : "field"} sales <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </article>
            </div>

            <footer className="playbook-footer">
              <span>This is a new illustrative guide, not a verified reproduction of the earlier AA Wealth playbook.</span>
              <span>Adapt to your FSP licence, insurer material, internal supervision and POPIA requirements.</span>
            </footer>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
