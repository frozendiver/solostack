import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import SetupMeter from "@/components/SetupMeter";
import PriceBadge from "@/components/PriceBadge";
import toolsData from "@/content/tools.json";
import categoriesData from "@/content/categories.json";
import type { Tool, Category } from "@/types";

const allTools = toolsData as Tool[];
const categories = categoriesData as Category[];

export function generateStaticParams() {
  return allTools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = allTools.find((t) => t.slug === slug);
  if (!tool) return {};
  const title = `${tool.name} — Pricing, Pros & Cons | SoloStack`;
  const description = `${tool.tagline} ${tool.bestFor} Pricing, pros, cons, and setup effort reviewed.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://solostack.co/tools/${tool.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `https://solostack.co/tools/${tool.slug}` },
  };
}

const SETUP_LABELS: Record<string, string> = {
  quick: "Quick win — under 30 minutes to value",
  moderate: "Some setup — a few hours to configure",
  investment: "Investment — plan for a day or more",
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = allTools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const cat = categories.find((c) => c.slug === tool.category);
  const related = allTools
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: tool.pricingModel === "free" ? "0" : undefined,
      priceCurrency: "USD",
      description: tool.startingPrice,
    },
    url: tool.website,
    review: {
      "@type": "Review",
      reviewBody: tool.whyHere,
      author: { "@type": "Organization", name: "SoloStack" },
      positiveNotes: tool.pros,
      negativeNotes: tool.cons,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://solostack.co" },
      ...(cat
        ? [{ "@type": "ListItem", position: 2, name: cat.name, item: `https://solostack.co/category/${cat.slug}` }]
        : []),
      { "@type": "ListItem", position: cat ? 3 : 2, name: tool.name, item: `https://solostack.co/tools/${tool.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header toolCount={allTools.length} />
      <main>
        <div className="page-hero-wrap">
          <section className="page-hero">
            <div className="wrap">
              {/* Breadcrumb */}
              <nav className="breadcrumb" aria-label="breadcrumb">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                {cat && (
                  <>
                    <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
                    <span className="sep">/</span>
                  </>
                )}
                <span>{tool.name}</span>
              </nav>

              {/* Tool header */}
              <div className="tool-detail-header">
                <span className="tool-logo tool-hero-logo">{tool.name.slice(0, 2)}</span>
                <div>
                  <div className="tool-meta-badges">
                    {cat && (
                      <Link href={`/category/${cat.slug}`} className="cat-badge">
                        {cat.name}
                      </Link>
                    )}
                    <PriceBadge model={tool.pricingModel} price={tool.startingPrice} />
                  </div>
                  <h1 className="tool-detail-title">{tool.name}</h1>
                  <p className="tool-detail-tagline">{tool.tagline}</p>
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="visit-cta"
                  >
                    Visit {tool.name}
                    <Icon name="arrow-right" size={16} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Content well */}
        <section style={{ paddingTop: "48px", paddingBottom: "80px" }}>
          <div className="wrap">
            <div className="content-well">
              {/* Description */}
              <p className="prose">{tool.description}</p>

              {/* Info grid */}
              <div className="info-grid">
                <div className="info-card">
                  <span className="info-card-label">Best for</span>
                  <p>{tool.bestFor}</p>
                </div>
                <div className="info-card">
                  <span className="info-card-label">Pricing</span>
                  <p>{tool.startingPrice}</p>
                </div>
                <div className="info-card">
                  <span className="info-card-label">Setup effort</span>
                  <SetupMeter level={tool.setupEffort} />
                  <p className="setup-note">{SETUP_LABELS[tool.setupEffort]}</p>
                </div>
                <div className="info-card">
                  <span className="info-card-label">Added to SoloStack</span>
                  <p>
                    {new Date(tool.dateAdded).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Editorial take */}
              <div className="editorial">
                <span className="editorial-label">Why it&apos;s on SoloStack</span>
                <p>{tool.whyHere}</p>
              </div>

              {/* Pros & cons */}
              <div className="pros-cons">
                <div>
                  <p className="pros-cons-label">What we like</p>
                  <ul>
                    {tool.pros.map((pro, i) => (
                      <li key={i}>
                        <span className="pro-icon">
                          <Icon name="check" size={15} strokeWidth={2.5} />
                        </span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="pros-cons-label">Watch out for</p>
                  <ul>
                    {tool.cons.map((con, i) => (
                      <li key={i}>
                        <span className="con-icon">
                          <Icon name="x" size={15} strokeWidth={2.5} />
                        </span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Related tools */}
            {related.length > 0 && (
              <div style={{ marginTop: "56px" }}>
                <div className="section-head" style={{ textAlign: "left", maxWidth: "none", marginBottom: "28px" }}>
                  <span className="section-label">More like this</span>
                  <h2 style={{ fontSize: "24px" }}>
                    Other {cat?.name ?? "tools"} to consider
                  </h2>
                </div>
                <div className="tool-grid">
                  {related.map((t) => (
                    <ToolCard key={t.slug} tool={t} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
