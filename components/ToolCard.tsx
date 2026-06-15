import Link from "next/link";
import SetupMeter from "./SetupMeter";
import PriceBadge from "./PriceBadge";
import type { Tool } from "@/types";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="tool-card">
      <div className="tool-top">
        <span className="tool-logo">{tool.name.slice(0, 2)}</span>
        <div className="tool-badges">
          {tool.featured && <span className="featured-badge">★ Featured</span>}
          <PriceBadge model={tool.pricingModel} price={tool.startingPrice} />
        </div>
      </div>
      <h3>{tool.name}</h3>
      <p className="tool-tagline">{tool.tagline}</p>
      <div className="best-for">
        <strong>Best for</strong>
        {tool.bestFor}
      </div>
      <SetupMeter level={tool.setupEffort} />
    </Link>
  );
}
