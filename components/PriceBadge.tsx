import type { PricingModel } from "@/types";

export default function PriceBadge({ model, price }: { model: PricingModel; price: string }) {
  return <span className={`price-badge ${model}`}>{price}</span>;
}
