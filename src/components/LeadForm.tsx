import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowLeft, Check, ShieldCheck } from "lucide-react";
import {
  COVER_OPTIONS,
  getCoverQuestions,
  formatIntakeMessage,
  type IntakeData,
} from "@/lib/intake";

const STEPS = ["Your cover", "Your needs", "Your details", "Review"];
export default function LeadForm({ defaultInterest = "Life cover" }: { defaultInterest?: string }) {
  const id = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [data, setData] = useState<IntakeData>({
    cover: defaultInterest,
    answers: {},
    name: "",
    phone: "",
    email: "",
    province: "KwaZulu-Natal",
    preference: "WhatsApp",
    contactTime: "Any business-hour time",
    consent: false,
  });
  const update = <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => {
    setReady(false);
    setData((d) => ({ ...d, [key]: value }));
  };
  useEffect(() => {
    setData((d) => ({ ...d, cover: defaultInterest, answers: {} }));
    setStep(0);
    setReady(false);
  }, [defaultInterest]);
  useEffect(() => {
    const cover = new URLSearchParams(window.location.search).get("cover");
    if (cover && COVER_OPTIONS.includes(cover)) setData((d) => ({ ...d, cover }));
  }, []);
  const questions = getCoverQuestions(data.cover);
  const move = (next: number) => {
    setStep(next);
    setReady(false);
    window.setTimeout(() => heading.current?.focus({ preventScroll: true }), 0);
  };
  const message = formatIntakeMessage(data);
  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < 3) move(step + 1);
    else setReady(true);
  };
  return (
    <div className="formcard enquiry-card guided-intake">
      <div className="intake-progress" aria-label={`Step ${step + 1} of 4: ${STEPS[step]}`}>
        <div className="intake-progress-label">
          <span>YOUR PERSONALISED ENQUIRY</span>
          <strong>{step + 1} / 4</strong>
        </div>
        <ol>
          {STEPS.map((label, i) => (
            <li
              key={label}
              aria-current={step === i ? "step" : undefined}
              className={i <= step ? "reached" : ""}
            >
              <span>{i < step ? <Check size={12} /> : i + 1}</span>
              {label}
            </li>
          ))}
        </ol>
      </div>
      <h3 ref={heading} tabIndex={-1}>
        {
          [
            "What matters to you?",
            "A little about your needs.",
            "How can we reach you?",
            ready ? "Your enquiry is ready." : "Does everything look right?",
          ][step]
        }
      </h3>
      <p className="form-intro">
        {
          [
            "Choose where you’d like to start. An advisor can help you decide.",
            "A starting point for your advisor—not a quote or an application.",
            "Only the details needed to start a useful conversation.",
            ready
              ? "Open WhatsApp and press Send to share your enquiry. It has not been submitted online."
              : "Review your answers before preparing your message.",
          ][step]
        }
      </p>
      <form onSubmit={formSubmit}>
        {step === 0 && (
          <fieldset className="intake-fieldset">
            <legend className="sr-only">Choose the cover you are interested in</legend>
            <div className="intake-cover-options">
              {COVER_OPTIONS.map((cover) => (
                <label key={cover} className={data.cover === cover ? "selected" : ""}>
                  <input
                    type="radio"
                    name={id + "-cover"}
                    checked={data.cover === cover}
                    onChange={() => setData((d) => ({ ...d, cover, answers: {} }))}
                    required
                  />
                  <span>{cover}</span>
                </label>
              ))}
            </div>
            <p className="small-note">
              You can change this later. No payment or identity documents required.
            </p>
          </fieldset>
        )}
        {step === 1 && (
          <fieldset className="intake-fieldset">
            <legend className="intake-selection">{data.cover}</legend>
            {questions.map((q) => (
              <div className="field" key={q.key}>
                <label htmlFor={id + q.key}>{q.label}</label>
                <select
                  id={id + q.key}
                  required
                  value={data.answers[q.key] || ""}
                  onChange={(e) => update("answers", { ...data.answers, [q.key]: e.target.value })}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {q.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                {q.hint && <p className="field-hint">{q.hint}</p>}
              </div>
            ))}
            <div className="intake-notice">
              <ShieldCheck size={18} />
              <p>
                We’ll discuss detailed medical and policy information securely with you later.
                Please don’t provide it here.
              </p>
            </div>
          </fieldset>
        )}
        {step === 2 && (
          <fieldset className="intake-fieldset">
            <legend className="sr-only">Your contact details</legend>
            <div className="field">
              <label htmlFor={id + "-name"}>Full name</label>
              <input
                id={id + "-name"}
                required
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                maxLength={100}
                autoComplete="name"
                placeholder="Name and surname"
                pattern=".*\S.*"
              />
            </div>
            <div className="field">
              <label htmlFor={id + "-phone"}>South African mobile number</label>
              <input
                id={id + "-phone"}
                required
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                pattern="(?:0|\+?27)\s?[6-8](?:\s?[0-9]){8}"
                maxLength={16}
                placeholder="082 123 4567"
                title="Use an SA mobile number, for example 082 123 4567 or +27 82 123 4567"
              />
            </div>
            <div className="field">
              <label htmlFor={id + "-email"}>
                Email address <span className="optional">(optional)</span>
              </label>
              <input
                id={id + "-email"}
                type="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                maxLength={160}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="field">
              <label htmlFor={id + "-province"}>Province</label>
              <select
                id={id + "-province"}
                value={data.province}
                onChange={(e) => update("province", e.target.value)}
              >
                {[
                  "KwaZulu-Natal",
                  "Gauteng",
                  "Western Cape",
                  "Eastern Cape",
                  "Free State",
                  "Limpopo",
                  "Mpumalanga",
                  "North West",
                  "Northern Cape",
                ].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="row2">
              <div className="field">
                <label htmlFor={id + "-preference"}>Contact me by</label>
                <select
                  id={id + "-preference"}
                  value={data.preference}
                  onChange={(e) => update("preference", e.target.value)}
                >
                  <option>WhatsApp</option>
                  <option>Phone call</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor={id + "-time"}>Preferred time</label>
                <select
                  id={id + "-time"}
                  value={data.contactTime}
                  onChange={(e) => update("contactTime", e.target.value)}
                >
                  {[
                    "Any business-hour time",
                    "Morning (08:00–12:00)",
                    "Afternoon (12:00–17:00)",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="small-note">
              Times are South African time. We’ll arrange a suitable slot with you.
            </p>
          </fieldset>
        )}
        {step === 3 && (
          <>
            <div className="intake-review">
              <div className="review-group">
                <div className="review-group-head">
                  <strong>Your cover and needs</strong>
                  <button type="button" onClick={() => move(0)}>
                    Edit cover
                  </button>
                </div>
                <p>{data.cover}</p>
                <dl>
                  {questions.map((q) => (
                    <div key={q.key}>
                      <dt>{q.label}</dt>
                      <dd>{data.answers[q.key] || "Not provided"}</dd>
                    </div>
                  ))}
                </dl>
                <button type="button" className="text-link" onClick={() => move(1)}>
                  Edit needs
                </button>
              </div>
              <div className="review-group">
                <div className="review-group-head">
                  <strong>Contact details</strong>
                  <button type="button" onClick={() => move(2)}>
                    Edit
                  </button>
                </div>
                <p>
                  {data.name}
                  <br />
                  {data.phone}
                  {data.email && (
                    <>
                      <br />
                      {data.email}
                    </>
                  )}
                  <br />
                  {data.province}
                </p>
                <p>
                  {data.preference} · {data.contactTime}
                </p>
              </div>
            </div>
            {!ready && (
              <label className="consent">
                <input
                  type="checkbox"
                  required
                  checked={data.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                />
                I agree that AA Wealth may contact me about this enquiry and use these details to
                assess my needs and arrange advisor follow-up. This is not consent to unrelated
                marketing.
              </label>
            )}
            <details className="privacy-note">
              <summary>How your details are used</summary>
              <p>
                Your answers stay in this page’s memory until you send them. They are not saved to a
                website database. Sending by WhatsApp or email shares them with AA Wealth and the
                chosen messaging provider. AA Wealth uses them to handle this enquiry. Contact
                hello@aawealth.co.za about access, correction or deletion. Do not include identity
                documents or medical records.
              </p>
            </details>
          </>
        )}
        {!ready ? (
          <div className="intake-actions">
            {step > 0 && (
              <button type="button" className="text-link" onClick={() => move(step - 1)}>
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <button type="submit" className="btn btn-gold">
              {step === 3 ? "Prepare my quote enquiry" : "Continue"}
              <ArrowUpRight size={18} />
            </button>
          </div>
        ) : (
          <div className="intake-handoff" role="status">
            <a
              className="btn btn-green"
              href={"https://wa.me/27765885126?text=" + encodeURIComponent(message)}
            >
              Open WhatsApp to send <ArrowUpRight size={18} />
            </a>
            <a
              className="email-alternative"
              href={
                "mailto:hello@aawealth.co.za?subject=Personalised%20quote%20enquiry&body=" +
                encodeURIComponent(message)
              }
            >
              Send using my email app instead
            </a>
            <button type="button" className="text-link" onClick={() => setReady(false)}>
              Back to review
            </button>
          </div>
        )}
        <p className="form-footnote">
          <ShieldCheck size={15} /> No obligation. Your advisor confirms quote options.
        </p>
      </form>
    </div>
  );
}
