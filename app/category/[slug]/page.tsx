import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterableToolGrid from "@/components/FilterableToolGrid";
import categoriesData from "@/content/categories.json";
import toolsData from "@/content/tools.json";
import type { Category, Tool } from "@/types";

const categories = categoriesData as Category[];
const allTools = toolsData as Tool[];

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};
  const tools = allTools.filter((t) => t.category === slug);
  const title = `Best AI Tools for ${cat.name} in 2026 | SoloStack`;
  const description = `${tools.length} curated AI tools for ${cat.name.toLowerCase()} — each tested in a real solo founder workflow. ${cat.description}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://solostack.co/category/${slug}`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `https://solostack.co/category/${slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const tools = allTools.filter((t) => t.category === slug);
  const totalTools = allTools.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best AI Tools for ${cat.name} in 2026`,
    description: cat.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      description: t.tagline,
      url: `https://solostack.co/tools/${t.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://solostack.co" },
      { "@type": "ListItem", position: 2, name: cat.name, item: `https://solostack.co/category/${cat.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header toolCount={totalTools} />
      <main>
        <div className="page-hero-wrap">
          <section className="page-hero">
            <div className="wrap">
              <Link href="/#categories" className="back-link">
                <Icon name="arrow-left" size={14} />
                All categories
              </Link>
              <div className="page-hero-inner">
                <span
                  className="page-hero-icon"
                  style={{ background: "var(--indigo-pale)", color: "var(--indigo)" }}
                >
                  <Icon name={cat.icon} size={26} />
                </span>
                <div>
                  <h1 className="page-hero-title">{cat.name}</h1>
                  <p className="page-hero-desc">{cat.description}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section style={{ paddingTop: "48px", paddingBottom: "80px" }}>
          <div className="wrap">
            <div className="count-header">
              <span className="count-title">
                {tools.length} {tools.length === 1 ? "tool" : "tools"} in this category
              </span>
            </div>
            <FilterableToolGrid tools={tools} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
