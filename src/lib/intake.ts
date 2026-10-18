export const COVER_OPTIONS = [
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
export type IntakeData = {
  cover: string;
  answers: Record<string, string>;
  name: string;
  phone: string;
  email: string;
  province: string;
  preference: string;
  contactTime: string;
  consent: boolean;
};
export type Question = { key: string; label: string; options: string[]; hint?: string };
const age: Question = {
  key: "age",
  label: "Your age range",
  options: [
    "18–24",
    "25–34",
    "35–44",
    "45–54",
    "55–64",
    "65+",
    "Prefer to discuss with an advisor",
  ],
};
const budget: Question = {
  key: "budget",
  label: "Monthly budget you’re comfortable with",
  options: [
    "Under R250",
    "R250–R499",
    "R500–R999",
    "R1,000–R1,999",
    "R2,000+",
    "Help me work this out",
  ],
  hint: "This is your preferred budget, not an advertised premium.",
};
const existing: Question = {
  key: "existing",
  label: "Do you already have this type of cover?",
  options: [
    "Yes, personally",
    "Yes, through my employer",
    "Both personal and employer cover",
    "No",
    "Not sure",
  ],
};
export function getCoverQuestions(cover: string): Question[] {
  if (cover === "Group & stokvel")
    return [
      {
        key: "group",
        label: "What kind of group?",
        options: ["Stokvel or burial society", "Employees", "Church or community group", "Other"],
      },
      {
        key: "members",
        label: "Approximate number of members",
        options: ["Under 10", "10–49", "50–199", "200+", "Not sure yet"],
      },
      {
        key: "goal",
        label: "What would you like help with?",
        options: [
          "Funeral cover",
          "Life cover",
          "Employee benefits",
          "Review an existing scheme",
          "Help me choose",
        ],
      },
    ];
  if (cover === "Savings & retirement")
    return [
      age,
      {
        key: "goal",
        label: "What are you planning for?",
        options: [
          "Retirement",
          "My children’s education",
          "Long-term savings",
          "Review existing savings",
          "Help me choose",
        ],
      },
      budget,
    ];
  if (cover === "Review my existing cover" || cover === "Not sure — help me choose")
    return [
      age,
      {
        key: "priority",
        label: "What matters most right now?",
        options: [
          "Protect my dependants",
          "Protect my income",
          "Funeral expenses",
          "Check my current cover",
          "Planning for retirement",
          "Help me decide",
        ],
      },
      budget,
    ];
  const goal: Question =
    cover.includes("funeral") || cover === "Funeral cover"
      ? {
          key: "family",
          label: "Who would you like to cover?",
          options: [
            "Myself",
            "Myself and my partner",
            "My immediate family",
            "Parents or grandparents",
            "Extended family",
            "Discuss my options",
          ],
        }
      : cover === "Income protection"
        ? {
            key: "work",
            label: "Your current work situation",
            options: [
              "Employed full-time",
              "Employed part-time or on contract",
              "Self-employed",
              "Not currently working",
              "Prefer to discuss",
            ],
          }
        : {
            key: "amount",
            label: "Cover amount you’d like to explore",
            options: [
              "Under R500,000",
              "R500,000–R999,999",
              "R1 million–R1.99 million",
              "R2 million–R4.99 million",
              "R5 million+",
              "Help me work this out",
            ],
          };
  return [age, goal, budget, existing];
}
export function formatIntakeMessage(data: IntakeData): string {
  const answers = getCoverQuestions(data.cover).map(
    (q) => `${q.label}: ${data.answers[q.key] || "Not provided"}`,
  );
  return [
    "Hello AA Wealth, I’d like a personalised quote enquiry and advisor review.",
    `Cover: ${data.cover}`,
    ...answers,
    `Name: ${data.name.trim()}`,
    `Mobile: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "",
    `Province: ${data.province}`,
    `Contact preference: ${data.preference}`,
    `Preferred time (SAST): ${data.contactTime}`,
    data.consent
      ? "I consent to AA Wealth using these details for this enquiry and advisor follow-up. No unrelated marketing consent given."
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}
export function validateIntake(data: IntakeData): void {
  if (
    !COVER_OPTIONS.includes(data.cover) ||
    !data.consent ||
    !data.name.trim() ||
    data.name.length > 100
  )
    throw new Error("Invalid enquiry or missing consent");
  const phone = data.phone.replace(/\s/g, "");
  if (!/^(?:0|\+?27)[6-8]\d{8}$/.test(phone)) throw new Error("Invalid SA mobile number");
  if (data.email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 160))
    throw new Error("Invalid email address");
  for (const q of getCoverQuestions(data.cover))
    if (!q.options.includes(data.answers[q.key])) throw new Error(`Missing or invalid ${q.key}`);
}
