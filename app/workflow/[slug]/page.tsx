import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterableToolGrid from "@/components/FilterableToolGrid";
import workflowsData from "@/content/workflows.json";
import toolsData from "@/content/tools.json";
import type { Workflow, Tool } from "@/types";

const workflows = workflowsData as Workflow[];
const allTools = toolsData as Tool[];

export function generateStaticParams() {
  return workflows.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const wf = workflows.find((w) => w.slug === slug);
  if (!wf) return {};
  const tools = allTools.filter((t) => t.workflows.includes(slug));
  const title = `Best AI Tools to ${wf.name} in 2026 | SoloStack`;
  const description = `${tools.length} curated AI tools to help you ${wf.name.toLowerCase()} — tested in real solo founder stacks.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://solostack.co/workflow/${slug}`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `https://solostack.co/workflow/${slug}` },
  };
}

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wf = workflows.find((w) => w.slug === slug);
  if (!wf) notFound();

  const tools = allTools.filter((t) => t.workflows.includes(slug));
  const totalTools = allTools.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best AI Tools to ${wf.name} in 2026`,
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
      { "@type": "ListItem", position: 2, name: wf.name, item: `https://solostack.co/workflow/${wf.slug}` },
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
              <Link href="/" className="back-link">
                <Icon name="arrow-left" size={14} />
                All workflows
              </Link>
              <div className="page-hero-inner">
                <span
                  className="page-hero-icon"
                  style={{ background: "var(--amber-pale)", color: "#9A6B0F" }}
                >
                  <Icon name={wf.icon} size={26} />
                </span>
                <div>
                  <h1 className="page-hero-title">{wf.name}</h1>
                  <p className="page-hero-desc">
                    The best AI tools for this workflow, tested in real solo founder stacks.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section style={{ paddingTop: "48px", paddingBottom: "80px" }}>
          <div className="wrap">
            <div className="count-header">
              <span className="count-title">
                {tools.length} {tools.length === 1 ? "tool" : "tools"} for this workflow
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
