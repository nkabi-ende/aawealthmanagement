import type { ReactNode } from "react";

/** Whitelisted Markdown renderer: React escapes text; no raw HTML or script execution. */
function inlineMarkdown(value: string): ReactNode[] {
  const result: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|\*\*([^*]+)\*\*)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(value)) !== null) {
    if (match.index > cursor) result.push(value.slice(cursor, match.index));
    if (match[2] && match[3]) {
      result.push(
        <a href={match[3]} target="_blank" rel="noopener noreferrer" key={match.index}>
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      result.push(<strong key={match.index}>{match[4]}</strong>);
    }
    cursor = pattern.lastIndex;
  }
  if (cursor < value.length) result.push(value.slice(cursor));
  return result;
}

function renderBlock(block: string, i: number): ReactNode {
  const lines = block.trim().split("\n");
  if (!lines.length || !lines[0]) return null;
  const first = lines[0];
  if (/^## /.test(first)) return <h2 key={i}>{inlineMarkdown(first.slice(3))}</h2>;
  if (/^### /.test(first)) return <h3 key={i}>{inlineMarkdown(first.slice(4))}</h3>;
  if (/^#### /.test(first)) return <h4 key={i}>{inlineMarkdown(first.slice(5))}</h4>;
  if (lines.every((line) => /^[-*] /.test(line))) {
    return <ul key={i}>{lines.map((line, n) => <li key={n}>{inlineMarkdown(line.slice(2))}</li>)}</ul>;
  }
  if (lines.every((line) => /^\d+\. /.test(line))) {
    return <ol key={i}>{lines.map((line, n) => <li key={n}>{inlineMarkdown(line.replace(/^\d+\.\s+/, ""))}</li>)}</ol>;
  }
  if (lines.every((line) => /^> /.test(line))) {
    return <blockquote key={i}>{inlineMarkdown(lines.map((l) => l.slice(2)).join(" "))}</blockquote>;
  }
  if (/^\*[^*].*\*$/.test(first) && lines.length === 1) return <p key={i}><em>{first.slice(1, -1)}</em></p>;
  return <p key={i}>{inlineMarkdown(lines.join(" "))}</p>;
}

export default function InsightBody({ content }: { content: string }) {
  return <div className="insight-body">{content.split(/\n\s*\n/).map(renderBlock)}</div>;
}
