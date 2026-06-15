import Link from "next/link";
import Icon from "./Icon";
import type { Workflow } from "@/types";

export default function WorkflowGrid({ workflows }: { workflows: Workflow[] }) {
  return (
    <section className="workflows" id="workflows">
      <div className="wrap">
        <div className="section-head">
          <span className="section-label">Start here</span>
          <h2>Find tools by what you&apos;re doing</h2>
          <p>
            Most directories sort by category. We&apos;ve found solo builders search by task —
            so here&apos;s where to start.
          </p>
        </div>
        <div className="workflow-grid">
          {workflows.map((w) => (
            <Link key={w.slug} href={`/workflow/${w.slug}`} className="workflow-card">
              <span className="workflow-icon">
                <Icon name={w.icon} size={20} />
              </span>
              <span className="workflow-label">{w.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
