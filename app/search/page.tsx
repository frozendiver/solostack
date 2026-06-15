import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResults";
import toolsData from "@/content/tools.json";
import type { Tool } from "@/types";

const allTools = toolsData as Tool[];

export function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Metadata {
  return {
    title: "Search — SoloStack",
    description: "Search the SoloStack directory of curated AI tools for solo founders.",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  return (
    <>
      <Header toolCount={allTools.length} />
      <main>
        <section className="search-hero">
          <div className="wrap">
            <SearchResults tools={allTools} initialQuery={query} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
