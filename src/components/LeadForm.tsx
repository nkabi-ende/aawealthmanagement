import { useState } from "react";

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="formcard">
      {!sent ? (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="field">
            <label htmlFor="f-name">Full name</label>
            <input id="f-name" required name="name" placeholder="e.g. Thandi Mthembu" autoComplete="name" />
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="f-phone">Mobile number</label>
              <input id="f-phone" required name="phone" type="tel" inputMode="tel" placeholder="082 000 0000" autoComplete="tel" />
            </div>
            <div className="field">
              <label htmlFor="f-email">Email (optional)</label>
              <input id="f-email" name="email" type="email" placeholder="you@email.com" autoComplete="email" />
            </div>
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="f-age">Age group</label>
              <select id="f-age" name="age" defaultValue="">
                <option value="">Select…</option>
                <option>Under 25</option><option>25–35</option><option>36–45</option><option>Over 45</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-int">I'm interested in</label>
              <select id="f-int" name="interest" defaultValue="">
                <option value="">Select…</option>
                <option>Funeral cover</option>
                <option>Advanced Pensioners Funeral Plan (Emerald Life)</option>
                <option>Life cover</option>
                <option>Income protection</option>
                <option>Critical illness</option>
                <option>Savings / Retirement</option>
                <option>Group cover</option>
                <option>Not sure — review my gaps</option>
              </select>
            </div>
          </div>
          <label className="consent">
            <input type="checkbox" required /> I agree to be contacted by AA Wealth (FSP 50739) and
            consent to my information being processed under POPIA.
          </label>
          <button type="submit" className="btn btn-gold">Get my free review</button>
        </form>
      ) : (
        <div className="thanks" role="status">
          <div className="big">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <h3>Sawubona! 👋</h3>
          <p>Thanks — one of our advisors will WhatsApp or call you shortly. Prefer to chat now?</p>
          <a
            href="https://wa.me/27765885126?text=Sawubona%20AA%20Wealth%2C%20I%20just%20requested%20a%20free%20review"
            className="btn btn-green"
          >
            Chat on WhatsApp now
          </a>
        </div>
      )}
    </div>
  );
}
