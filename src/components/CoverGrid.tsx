import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Item = {
  title: string;
  desc: string;
  icon: ReactNode;
  feature?: boolean;
  ribbon?: string;
  href?: string;
  cta?: string;
};

const ITEMS: Item[] = [
  {
    title: "Funeral Cover",
    desc: "Dignified send-offs, sorted fast. Help with funeral expenses. Ask us about family members, premiums, waiting periods and claim requirements.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 11l9-8 9 8v10a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Advanced Pensioners Funeral Plan",
    desc: "Explore funeral cover for parents and grandparents. Entry ages, premiums and eligibility depend on the insurer’s current product terms.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    feature: true,
    ribbon: "For pensioners",
  },
  {
    title: "Life Cover",
    desc: "Help your loved ones with home loans, school fees and living costs through a life-cover payout, subject to policy terms.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Income Protection",
    desc: "Explore a monthly benefit if illness or injury prevents you from working, subject to policy terms.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Critical Illness",
    desc: "Explore a lump sum for specified serious illnesses. Definitions, severity requirements and exclusions apply.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: "Disability Cover",
    desc: "Explore financial support if you meet your policy’s disability definition. Benefits and exclusions vary.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
      </svg>
    ),
  },
  {
    title: "Savings & Retirement",
    desc: "Discuss savings and retirement goals, costs, investment risks and suitable options with your advisor.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 3v18h18M7 14l4-4 4 4 6-6" />
      </svg>
    ),
  },
  {
    title: "Group & Stokvel",
    desc: "Cover your society, stokvel or employees together — at scheme rates.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    cta: "Learn more →",
  },
];

export default function CoverGrid() {
  return (
    <div className="grid cards7">
      {ITEMS.map((it) => (
        <article key={it.title} className={`card${it.feature ? " feature" : ""}`}>
          {it.ribbon && <div className="ribbon">{it.ribbon}</div>}
          <div className="ic">{it.icon}</div>
          <h3>{it.title}</h3>
          <p>{it.desc}</p>
          <a
            className="more"
            href={
              "/contact?cover=" +
              encodeURIComponent(
                (
                  {
                    "Life Cover": "Life cover",
                    "Funeral Cover": "Funeral cover",
                    "Advanced Pensioners Funeral Plan": "Pensioners funeral cover",
                    "Income Protection": "Income protection",
                    "Critical Illness": "Critical illness",
                    "Disability Cover": "Disability cover",
                    "Savings & Retirement": "Savings & retirement",
                    "Group & Stokvel": "Group & stokvel",
                  } as Record<string, string>
                )[it.title] ?? "Not sure — help me choose",
              )
            }
          >
            {it.cta ?? "Discuss this cover →"}
          </a>
        </article>
      ))}
      <article className="card cta-card">
        <h3>Not sure what you need?</h3>
        <p>Let us map your gaps in a free 15-minute review.</p>
        <Link
          className="btn btn-gold"
          to="/contact"
          style={{ alignSelf: "flex-start", marginTop: 6 }}
        >
          Start free
        </Link>
      </article>
    </div>
  );
}
