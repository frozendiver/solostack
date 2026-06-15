import Link from "next/link";
import PriceBadge from "./PriceBadge";
import SetupMeter from "./SetupMeter";
import type { Tool } from "@/types";

export default function FeaturedTools({ tools }: { tools: Tool[] }) {
  return (
    <section className="featured">
      <div className="wrap">
        <div className="section-head">
          <span className="section-label">Editor&apos;s picks</span>
          <h2>Tools we&apos;d put in our own stack</h2>
          <p>
            Marked picks are tools the SoloStack team genuinely uses — never paid placements.
          </p>
        </div>
        <div className="tool-grid">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="tool-card">
              <div className="tool-top">
                <span className="tool-logo">{tool.name.slice(0, 2)}</span>
                <PriceBadge model={tool.pricingModel} price={tool.startingPrice} />
              </div>
              <h3>{tool.name}</h3>
              <p className="tool-tagline">{tool.tagline}</p>
              <div className="best-for">
                <strong>Best for</strong>
                {tool.bestFor}
              </div>
              <SetupMeter level={tool.setupEffort} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
