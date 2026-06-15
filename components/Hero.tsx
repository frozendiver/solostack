"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

export default function Hero({ toolCount }: { toolCount: number }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">A directory built for solo operators</span>
          <h1>
            Skip the hype.<br />
            Build your <span className="accent">AI stack.</span>
          </h1>
          <p className="subhead">
            A curated directory of practical AI tools — organized by real workflows that help
            solo builders ship faster, not just experiment more.
          </p>

          <form className="search-form" role="search" onSubmit={handleSearch}>
            <Icon
              name="search"
              size={18}
              style={{ color: "var(--ink-light)", marginLeft: "6px", alignSelf: "center" }}
            />
            <input
              type="text"
              placeholder="Search by tool, task, or workflow…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="trust-strip">
            <span>
              <Icon name="check" size={15} strokeWidth={2.5} />
              {toolCount} tools curated
            </span>
            <span>
              <Icon name="check" size={15} strokeWidth={2.5} />
              Pricing checked monthly
            </span>
            <span>
              <Icon name="check" size={15} strokeWidth={2.5} />
              No pay-to-rank
            </span>
          </div>
        </div>

        <div className="stack-illustration" aria-hidden="true">
          <div className="stack-block b1">
            Writing &amp; Content<span className="tag">22 tools</span>
          </div>
          <div className="stack-block b2">
            Automation<span className="tag">19 tools</span>
          </div>
          <div className="stack-block b3">Design</div>
          <div className="stack-block b4">Support</div>
        </div>
      </div>
    </section>
  );
}
