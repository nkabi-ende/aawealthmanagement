import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";

const SESSION_KEY = "aa-wealth-intro-v1";
function rememberIntro() {
  try {
    sessionStorage.setItem(SESSION_KEY, "seen");
  } catch {
    /* Optional storage. */
  }
}
export default function BrandPreloader() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const replay = new URLSearchParams(window.location.search).get("intro") === "1";
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "seen";
    } catch {
      /* Storage is optional. */
    }
    if (seen && !replay) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setVisible(true);
    const leaveTimer = window.setTimeout(() => setLeaving(true), reduced ? 350 : 2100);
    const finishTimer = window.setTimeout(
      () => {
        rememberIntro();
        setVisible(false);
      },
      reduced ? 450 : 2550,
    );
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(finishTimer);
    };
  }, []);
  useEffect(() => {
    if (!visible) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        rememberIntro();
        setVisible(false);
      }
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [visible]);
  useEffect(() => {
    if (!visible) return;
    const content = document.getElementById("aa-site-content");
    const overflow = document.body.style.overflow;
    content?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    return () => {
      content?.removeAttribute("inert");
      document.body.style.overflow = overflow;
    };
  }, [visible]);
  if (!visible) return null;
  return (
    <div className={`aa-preloader${leaving ? " is-leaving" : ""}`}>
      <div className="aa-intro-corner" aria-hidden="true">
        <span>AA /</span> A FUTURE WORTH PROTECTING
      </div>
      <button
        className="aa-intro-skip"
        type="button"
        onClick={() => {
          rememberIntro();
          setVisible(false);
          window.setTimeout(() => document.querySelector<HTMLElement>(".skip-link")?.focus(), 0);
        }}
      >
        Skip intro <span aria-hidden="true">↗</span>
      </button>
      <div className="aa-intro-centre" role="status" aria-live="polite">
        <div className="aa-intro-emblem" aria-hidden="true">
          <div className="aa-intro-orbit orbit-a" />
          <div className="aa-intro-orbit orbit-b" />
          <div className="aa-intro-halo" />
          <BrandMark />
          <span className="aa-orbit-spark" />
        </div>
        <div className="aa-intro-wordmark">
          <span className="aa-intro-name">AA Wealth</span>
          <span className="aa-intro-management">MANAGEMENT</span>
        </div>
        <p className="aa-intro-tagline">
          Protect today.
          <br />
          <em>Build tomorrow.</em>
        </p>
        <div className="aa-intro-rule" aria-hidden="true">
          <span />
        </div>
        <span className="sr-only">Welcome to AA Wealth Management.</span>
      </div>
      <div className="aa-intro-bottom" aria-hidden="true">
        <span>FAMILY · LIFE · FUTURE</span>
        <span>DURBAN, SOUTH AFRICA</span>
      </div>
    </div>
  );
}
