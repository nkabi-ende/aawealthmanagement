import { useEffect, useRef } from "react";
type Turnstile = {
  render(el: HTMLElement, options: Record<string, unknown>): string;
  remove(id: string): void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
export default function IntakeVerification({
  sitekey,
  onToken,
}: {
  sitekey: string;
  onToken: (token: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let widget: string | undefined;
    let disposed = false;
    const render = () => {
      if (!disposed && ref.current && window.turnstile && widget === undefined)
        widget = window.turnstile.render(ref.current, {
          sitekey,
          action: "intake",
          callback: onToken,
          "expired-callback": () => onToken(""),
          "error-callback": () => onToken(""),
        });
    };
    let script = document.querySelector<HTMLScriptElement>("script[data-aa-turnstile]");
    if (!script) {
      script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.dataset.aaTurnstile = "true";
      document.head.appendChild(script);
    }
    script.addEventListener("load", render);
    render();
    return () => {
      disposed = true;
      script?.removeEventListener("load", render);
      if (widget !== undefined) window.turnstile?.remove(widget);
    };
  }, [sitekey, onToken]);
  return <div ref={ref} aria-label="Enquiry security verification" />;
}
