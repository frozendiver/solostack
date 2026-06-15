import Link from "next/link";
import Icon from "./Icon";

export default function SubmitCTA() {
  return (
    <section id="submit">
      <div className="wrap">
        <div className="submit-cta">
          <h2>Built something useful for solo builders?</h2>
          <p>
            Get listed in front of the founders who&apos;ll actually use it. Every submission is
            reviewed against our curation criteria before it goes live.
          </p>
          <Link href="/submit" className="btn-primary">
            Submit a Tool
            <Icon name="arrow-right" size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
