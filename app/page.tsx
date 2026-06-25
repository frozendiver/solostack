import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkflowGrid from "@/components/WorkflowGrid";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedTools from "@/components/FeaturedTools";
import HowWeCurate from "@/components/HowWeCurate";
import RecentlyAdded from "@/components/RecentlyAdded";
import BeehiivNewsletter from "@/components/BeehiivNewsletter";
import SubmitCTA from "@/components/SubmitCTA";
import Footer from "@/components/Footer";

import toolsData from "@/content/tools.json";
import categoriesData from "@/content/categories.json";
import workflowsData from "@/content/workflows.json";

import type { Tool, Category, Workflow } from "@/types";

const BASE = "https://solostack.co";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SoloStack",
  url: BASE,
  description:
    "A curated directory of practical AI tools organized by real workflows for solo founders and indie hackers.",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SoloStack",
  url: BASE,
  description: "Curated AI tools for solo founders and indie hackers.",
};

export default function Home() {
  const tools = toolsData as Tool[];
  const categories = categoriesData as Category[];
  const workflows = workflowsData as Workflow[];

  const toolCount = tools.length;
  const featuredTools = tools.filter((t) => t.featured);
  const recentTools = tools
    .filter((t) => !t.featured)
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Header toolCount={toolCount} />
      <main>
        <Hero toolCount={toolCount} />
        <WorkflowGrid workflows={workflows} />
        <CategoryGrid categories={categories} toolCount={toolCount} />
        <FeaturedTools tools={featuredTools} />
        <HowWeCurate />
        <RecentlyAdded tools={recentTools} />
        <BeehiivNewsletter />
        <SubmitCTA />
      </main>
      <Footer />
    </>
  );
}
