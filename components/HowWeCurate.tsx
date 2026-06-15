import Icon from "./Icon";

const items = [
  {
    icon: "check-circle",
    title: "Used in a real workflow first",
    desc: "Every tool is tried in an actual day-to-day task before it's listed — not judged on a feature list alone.",
  },
  {
    icon: "dollar-sign",
    title: "Pricing shown upfront",
    desc: 'No "contact sales" surprises. If a tool hides its pricing, we say so — or we leave it out.',
  },
  {
    icon: "lock",
    title: "No pay-to-rank",
    desc: "Featured tools are clearly marked. Paying for a listing never changes where a tool ranks.",
  },
];

export default function HowWeCurate() {
  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <span className="section-label">Why trust this list</span>
          <h2>How we curate</h2>
        </div>
        <div className="curate-grid">
          {items.map((item) => (
            <div key={item.title} className="curate-item">
              <span className="curate-icon">
                <Icon name={item.icon} size={20} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
