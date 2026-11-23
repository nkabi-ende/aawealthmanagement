import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { buildAgentEnquiryMessage, emailEnquiryUrl, whatsappEnquiryUrl } from "@/lib/b2b-enquiry";

const experienceOptions = [
  "New to field sales",
  "Some field-sales experience",
  "Insurance sales experience",
  "Other customer-facing sales experience",
];
const availabilityOptions = [
  "Ready to discuss opportunities",
  "Within the next month",
  "Exploring for later",
];

export default function AgentInterestForm() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

  const ready = name.trim().length > 1 && area.trim().length > 1 && acknowledged;
  const message = buildAgentEnquiryMessage({ name, area, experience, availability });
  const whatsappUrl = whatsappEnquiryUrl(message);
  const emailUrl = emailEnquiryUrl("Field sales opportunity — " + (name.trim() || "Enquiry"), message);

  return (
    <div className="agent-interest-form">
      <div className="agent-form-topline">
        <span>AA / REPRESENTATIVE ENQUIRY</span>
        <span>01 — INTRODUCTION</span>
      </div>
      <h3>Introduce yourself.</h3>
      <p className="agent-interest-intro">
        A few details help us understand where you’re based and what you’d bring to the team.
      </p>
      <div className="agent-form-fields">
        <div>
          <label htmlFor="agent-name">Full name <span>*</span></label>
          <input
            id="agent-name"
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder="Your name and surname"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="agent-area">Area / suburb <span>*</span></label>
          <input
            id="agent-area"
            type="text"
            maxLength={100}
            placeholder="e.g. Newlands West, Durban"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="agent-experience">Previous sales experience</label>
          <select
            id="agent-experience"
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
          >
            <option value="">Select an option (optional)</option>
            {experienceOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="agent-availability">Availability</label>
          <select
            id="agent-availability"
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
          >
            <option value="">Select an option (optional)</option>
            {availabilityOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
      </div>
      <label className="agent-form-ack">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(event) => setAcknowledged(event.target.checked)}
        />
        <span>
          I understand this is a <strong>commission-only opportunity</strong>, not a guaranteed
          salary or an offer of appointment. <span className="agent-required">*</span>
        </span>
      </label>
      <p className="agent-form-hint"><ShieldCheck size={15} aria-hidden="true" /> No ID, CV or bank details required for this initial enquiry.</p>
      <div className="agent-form-actions">
        {ready ? (
          <a className="btn btn-gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Continue on WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        ) : (
          <button className="btn btn-gold" disabled type="button">
            Continue on WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        )}
        {ready ? (
          <a className="agent-form-email" href={emailUrl}>
            Send by email <ArrowRight size={16} aria-hidden="true" />
          </a>
        ) : (
          <span className="agent-form-email agent-form-email--disabled">Send by email</span>
        )}
      </div>
      <p className="agent-form-note">
        <Check size={14} aria-hidden="true" /> Enter your name, area and tick the acknowledgement.
        Your message opens in WhatsApp or email; it is <strong>not submitted or stored on this page</strong>.
      </p>
    </div>
  );
}
