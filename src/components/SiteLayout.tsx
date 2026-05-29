import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";

const WA_URL =
  "https://wa.me/27765885126?text=Sawubona%20AA%20Wealth%2C%20I%27d%20like%20a%20free%20protection%20review";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Cover" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

function WaIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zM6.597 20.13c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.599 5.39l-.999 3.648 3.79-.737z" />
    </svg>
  );
}

function BrandMark() {
  return (
    <svg className="mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#0B2545" />
      <path d="M9 33 L24 13 L39 33" stroke="#C8A04A" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 35.5 L24 23 L33 35.5" stroke="#0F7B5A" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [loc.pathname]);

  return (
    <>
      <header className={`site${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav">
          <Link to="/" className="brand" aria-label="AA Wealth Management — home">
            <BrandMark />
            <span className="name">
              AA Wealth<small>MANAGEMENT</small>
            </span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`link${loc.pathname === n.to ? " active" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="nav-cta">
            <Link
              to="/contact"
              className="btn btn-gold"
              style={{ padding: ".6rem 1.05rem", minHeight: 42, fontSize: ".9rem" }}
            >
              Free Review
            </Link>
            <a href={WA_URL} className="wa-btn" aria-label="Chat with AA Wealth on WhatsApp">
              <WaIcon />
            </a>
            <button
              className="burger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {NAV.map((n) => (
          <Link key={n.to} to={n.to}>{n.label}</Link>
        ))}
        <Link to="/contact" className="btn btn-gold">Get my free review</Link>
      </div>

      <main id="main">{children}</main>

      <FinalCta />
      <SiteFooter />

      <a className="fab" href={WA_URL} aria-label="Chat on WhatsApp">
        <WaIcon size={30} />
      </a>
      <div className="mbar">
        <Link to="/contact" className="btn btn-gold">Free review</Link>
        <a href={WA_URL} className="btn btn-green">
          <WaIcon size={18} /> WhatsApp
        </a>
      </div>
    </>
  );
}

function FinalCta() {
  return (
    <section className="finalcta" aria-labelledby="finh">
      <div className="wrap">
        <h2 id="finh">Find out what your family is missing — free.</h2>
        <p>A 15-minute review with a licensed Durban advisor. No cost. No obligation.</p>
        <div className="row">
          <Link to="/contact" className="btn btn-gold">Get my free protection review</Link>
          <a href={WA_URL} className="btn btn-ghost on-dark">WhatsApp us now</a>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site" aria-label="Site footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link to="/" className="brand"><BrandMark /></Link>
            <p className="name">AA Wealth</p>
            <p style={{ maxWidth: 320 }}>
              Protect today. Build tomorrow. Complete family protection for KZN — funeral, life,
              income, illness and savings.
            </p>
            <div className="socials">
              <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9H16l-.4 2.9h-2.1v7A10 10 0 0022 12z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
              <a href="#" aria-label="TikTok"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3a5 5 0 005 5v3a8 8 0 01-5-1.7V15a6 6 0 11-6-6v3a3 3 0 103 3V3z"/></svg></a>
              <a href={WA_URL} aria-label="WhatsApp"><WaIcon size={18} /></a>
            </div>
          </div>
          <nav aria-label="Cover links">
            <h4>Cover</h4>
            <Link to="/services">Funeral</Link>
            <Link to="/services">Life cover</Link>
            <Link to="/services">Income protection</Link>
            <Link to="/services">Critical illness</Link>
            <Link to="/services">Savings &amp; retirement</Link>
          </nav>
          <div>
            <h4>Contact</h4>
            <a href="tel:+27765885126">076 588 5126</a>
            <a href={WA_URL}>WhatsApp us</a>
            <a href="mailto:hello@aawealth.co.za">hello@aawealth.co.za</a>
            <address style={{ fontStyle: "normal", color: "rgba(255,255,255,.7)", marginTop: 9 }}>
              Durban, KwaZulu-Natal<br />
              Mon–Fri 8:00–17:00 · Sat 9:00–13:00
            </address>
          </div>
        </div>
        <p className="compliance">
          Amathintane Amahle Wealth Management t/a AA Wealth Management is an authorised Financial
          Services Provider, FSP No. 50739 (Long-Term Insurance Subcategories A, B1, C and Friendly
          Society Benefits). Terms, conditions, waiting periods and underwriting criteria apply.
          Information on this website is general in nature and does not constitute financial advice
          for your specific circumstances — please speak to us for a personal assessment. Your
          information is handled in line with POPIA. © 2026 AA Wealth Management. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
