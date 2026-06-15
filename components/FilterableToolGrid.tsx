"use client";

import { useState } from "react";
import ToolCard from "./ToolCard";
import type { Tool, PricingModel } from "@/types";

const FILTERS: { label: string; value: PricingModel | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Free", value: "free" },
  { label: "Freemium", value: "freemium" },
  { label: "Paid", value: "paid" },
  { label: "Trial", value: "trial" },
];

export default function FilterableToolGrid({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState<PricingModel | "all">("all");

  const filtered = active === "all" ? tools : tools.filter((t) => t.pricingModel === active);

  return (
    <div>
      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter-btn${active === f.value ? " active" : ""}`}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p style={{ color: "var(--ink-light)", textAlign: "center", padding: "48px 0" }}>
          No tools match this filter yet.
        </p>
      ) : (
        <div className="tool-grid">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
