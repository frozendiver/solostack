import Link from "next/link";
import Icon from "./Icon";
import type { Category } from "@/types";

export default function CategoryGrid({ categories, toolCount }: { categories: Category[]; toolCount: number }) {
  const totalTools = toolCount;

  return (
    <section id="categories">
      <div className="wrap">
        <div className="section-head">
          <span className="section-label">Browse</span>
          <h2>All categories</h2>
          <p>{`${totalTools} tools across ${categories.length} categories — each one tested in a real solo workflow before it's listed.`}</p>
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="category-card">
              <span className="category-icon">
                <Icon name={cat.icon} size={20} />
              </span>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <span className="category-count">{cat.toolCount} tools →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
