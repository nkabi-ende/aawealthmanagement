import { useEffect, useId, useState } from "react";
import { ArrowUpRight, ArrowLeft, ShieldCheck } from "lucide-react";
const OPTIONS = [
  "Life cover",
  "Funeral cover",
  "Pensioners funeral cover",
  "Income protection",
  "Critical illness",
  "Disability cover",
  "Savings & retirement",
  "Group & stokvel",
  "Review my existing cover",
  "Not sure — help me choose",
];
export default function LeadForm({ defaultInterest = "Life cover" }: { defaultInterest?: string }) {
  const id = useId();
  const [interest, setInterest] = useState(defaultInterest);
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState({ name: "", phone: "", preference: "WhatsApp" });
  useEffect(() => setInterest(defaultInterest), [defaultInterest]);
  useEffect(() => {
    const cover = new URLSearchParams(window.location.search).get("cover");
    if (cover && OPTIONS.includes(cover)) setInterest(cover);
  }, []);
  const wa = "https://wa.me/27765885126?text=" + encodeURIComponent(message);
  return (
    <div className="formcard enquiry-card">
      {!message ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            setDetails({
              name: String(data.get("name")),
              phone: String(data.get("phone")),
              preference: String(data.get("preference")),
            });
            setMessage(
              `Hello AA Wealth, I’d like a free protection review.\n\nName: ${data.get("name")}\nMobile: ${data.get("phone")}\nInterested in: ${interest}\nContact preference: ${data.get("preference")}\n\nI consent to AA Wealth contacting me about this enquiry and processing these details for that purpose.`,
            );
          }}
        >
          <p className="eyebrow">Your free protection review</p>
          <h3>Let’s make it personal.</h3>
          <p className="form-intro">A few details to start the conversation.</p>
          <div className="field">
            <label htmlFor={id + "-interest"}>What can we help with?</label>
            <select
              id={id + "-interest"}
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              name="interest"
            >
              {OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor={id + "-name"}>Your name</label>
            <input
              id={id + "-name"}
              name="name"
              defaultValue={details.name}
              required
              maxLength={100}
              autoComplete="name"
              placeholder="Name and surname"
            />
          </div>
          <div className="field">
            <label htmlFor={id + "-phone"}>South African mobile number</label>
            <input
              id={id + "-phone"}
              name="phone"
              defaultValue={details.phone}
              type="tel"
              inputMode="tel"
              required
              pattern="(?:0|\+?27)\s?[6-8][0-9\s]{8,12}"
              maxLength={16}
              autoComplete="tel"
              title="Use a South African mobile number, for example 082 123 4567 or +27 82 123 4567"
              placeholder="082 123 4567"
            />
          </div>
          <div className="field">
            <label htmlFor={id + "-preference"}>How would you like us to respond?</label>
            <select id={id + "-preference"} name="preference" defaultValue={details.preference}>
              <option>WhatsApp</option>
              <option>Phone call</option>
            </select>
          </div>
          <label className="consent">
            <input type="checkbox" required />I agree that AA Wealth may contact me about this
            enquiry and use my details for this purpose. <a href="#privacy-note">Privacy details</a>
          </label>
          <button type="submit" className="btn btn-gold">
            Prepare my enquiry <ArrowUpRight size={18} />
          </button>
          <p className="form-footnote">
            <ShieldCheck size={15} /> You review your message before sending.
          </p>
          <details id="privacy-note" className="privacy-note">
            <summary>How your details are used</summary>
            <p>
              This form prepares a message in your browser. Nothing is submitted to a website
              database. When you send it through WhatsApp, your details are shared with AA Wealth
              and processed by WhatsApp under its own terms. AA Wealth uses them to respond to this
              enquiry. Contact hello@aawealth.co.za to ask about access, correction or deletion.
              Avoid sending identity documents or medical information here.
            </p>
          </details>
        </form>
      ) : (
        <div className="enquiry-ready" role="status">
          <p className="eyebrow">Ready for your review</p>
          <h3>Your message is ready.</h3>
          <p>
            Your enquiry has not been sent yet. Open WhatsApp and press <strong>Send</strong> to
            share it with AA Wealth.
          </p>
          <pre>{message}</pre>
          <a className="btn btn-green" href={wa}>
            Open WhatsApp to send <ArrowUpRight size={18} />
          </a>
          <a
            className="email-alternative"
            href={
              "mailto:hello@aawealth.co.za?subject=Protection%20review%20enquiry&body=" +
              encodeURIComponent(message)
            }
          >
            Prefer email? Open your email app
          </a>
          <button type="button" className="text-link" onClick={() => setMessage("")}>
            <ArrowLeft size={16} /> Edit my details
          </button>
        </div>
      )}
    </div>
  );
}
