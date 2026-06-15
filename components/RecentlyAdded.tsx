import Link from "next/link";
import PriceBadge from "./PriceBadge";
import type { Tool } from "@/types";

export default function RecentlyAdded({ tools }: { tools: Tool[] }) {
  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <span className="section-label">Fresh additions</span>
          <h2>Recently added to the index</h2>
        </div>
        <div className="recent-grid">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="recent-card">
              <span className="tool-logo">{tool.name.slice(0, 2)}</span>
              <div className="recent-info">
                <h4>{tool.name}</h4>
                <p>{tool.tagline}</p>
              </div>
              <PriceBadge model={tool.pricingModel} price={tool.startingPrice} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
