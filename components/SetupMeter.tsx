import type { SetupEffort } from "@/types";

const config: Record<SetupEffort, { blocks: number; label: string }> = {
  quick: { blocks: 1, label: "Quick win" },
  moderate: { blocks: 2, label: "Some setup" },
  investment: { blocks: 3, label: "Some investment" },
};

export default function SetupMeter({ level }: { level: SetupEffort }) {
  const { blocks, label } = config[level];
  return (
    <div className="setup-meter">
      <span className="setup-blocks">
        <i className={blocks >= 1 ? "on" : undefined}></i>
        <i className={blocks >= 2 ? "on" : undefined}></i>
        <i className={blocks >= 3 ? "on" : undefined}></i>
      </span>
      {label}
    </div>
  );
}
