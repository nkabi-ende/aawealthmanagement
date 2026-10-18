import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
  type ButtonHTMLAttributes,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ShieldCheck } from "lucide-react";
import LeadForm from "./LeadForm";
import BrandMark from "./BrandMark";

const ReviewContext = createContext<{ openReview: (cover?: string) => void } | null>(null);
export function useReview() {
  const context = useContext(ReviewContext);
  if (!context) throw new Error("Review provider missing");
  return context;
}
export function ReviewButton({
  cover,
  children,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { cover?: string; children: ReactNode }) {
  const { openReview } = useReview();
  return (
    <button
      {...props}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openReview(cover);
      }}
    >
      {children}
    </button>
  );
}
export default function ReviewProvider({ children }: { children: ReactNode }) {
  const returnFocus = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState("Life cover");
  const [revision, setRevision] = useState(0);
  const openReview = (value = "Life cover") => {
    returnFocus.current = document.activeElement as HTMLElement;
    setCover(value);
    setRevision((r) => r + 1);
    setOpen(true);
  };
  return (
    <ReviewContext.Provider value={{ openReview }}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="review-modal-overlay" />
          <Dialog.Content
            className="review-modal"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              const target = returnFocus.current;
              if (target?.getClientRects().length) target.focus();
              else document.querySelector<HTMLElement>(".burger")?.focus();
            }}
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              window.setTimeout(() => document.getElementById("review-modal-title")?.focus(), 0);
            }}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <div className="review-modal-header">
              <div className="review-modal-brand">
                <BrandMark />
                <div>
                  <Dialog.Title id="review-modal-title" tabIndex={-1}>
                    Your free protection review
                  </Dialog.Title>
                  <Dialog.Description>
                    Let’s find the right starting point for you.
                  </Dialog.Description>
                </div>
              </div>
              <Dialog.Close className="review-modal-close" aria-label="Close protection review">
                <X size={21} />
              </Dialog.Close>
            </div>
            <div className="review-modal-scroll">
              <LeadForm key={revision} defaultInterest={cover} readCoverFromUrl={false} />
              <p className="review-modal-assurance">
                <ShieldCheck size={15} /> Private by design. No payment needed.
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ReviewContext.Provider>
  );
}
