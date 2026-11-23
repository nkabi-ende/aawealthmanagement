/** Professional-interest message builders. Nothing is posted to AA Wealth by these helpers. */

export type BrokerEnquiryDetails = {
  contactName: string;
  brokerage: string;
  teamSize: string;
  currentCrm: string;
  primaryChallenge: string;
  packageName: string;
  priorities: string[];
};

export type AgentEnquiryDetails = {
  name: string;
  area: string;
  experience: string;
  availability: string;
};

function safeLine(value: string, limit = 160): string {
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, limit);
}

export function buildBrokerEnquiryMessage(details: BrokerEnquiryDetails): string {
  const lines = [
    "Hello AA Wealth, I would like to discuss professional services for my insurance brokerage.",
    "Contact: " + (safeLine(details.contactName, 100) || "Not supplied"),
    "Brokerage: " + (safeLine(details.brokerage, 100) || "Not supplied"),
    "Team size: " + (safeLine(details.teamSize, 40) || "Not specified"),
    "Current CRM: " + (safeLine(details.currentCrm, 60) || "Not specified"),
    "Service model: " + (safeLine(details.packageName, 70) || "Help me choose"),
    "Areas of interest: " +
      (details.priorities.length
        ? details.priorities.map((priority) => safeLine(priority, 60)).filter(Boolean).join(", ")
        : "Help me prioritise"),
  ];
  const challenge = safeLine(details.primaryChallenge, 280);
  if (challenge) lines.push("Biggest challenge: " + challenge);
  lines.push("Please contact me about a suitable scope and quote.");
  return lines.join("\n");
}

export function buildAgentEnquiryMessage(details: AgentEnquiryDetails): string {
  return [
    "Hello AA Wealth, I am interested in your commission-only field sales representative opportunity.",
    "Name: " + (safeLine(details.name, 100) || "Not supplied"),
    "Area: " + (safeLine(details.area, 100) || "Not supplied"),
    "Sales experience: " + (safeLine(details.experience, 100) || "Not specified"),
    "Availability: " + (safeLine(details.availability, 100) || "Not specified"),
    "I understand that this is a commission-only opportunity and income is not guaranteed.",
    "Please share the next recruitment steps.",
  ].join("\n");
}

export function whatsappEnquiryUrl(message: string): string {
  return "https://wa.me/27765885126?text=" + encodeURIComponent(message);
}

export function emailEnquiryUrl(subject: string, message: string): string {
  return (
    "mailto:hello@aawealthmanagement.co.za?subject=" +
    encodeURIComponent(safeLine(subject, 120)) +
    "&body=" +
    encodeURIComponent(message)
  );
}
