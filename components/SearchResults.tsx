"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ToolCard from "./ToolCard";
import type { Tool } from "@/types";

function score(tool: Tool, q: string): number {
  const lq = q.toLowerCase();
  if (tool.name.toLowerCase().includes(lq)) return 3;
  if (tool.tagline.toLowerCase().includes(lq)) return 2;
  if (tool.description.toLowerCase().includes(lq)) return 1;
  if (tool.bestFor.toLowerCase().includes(lq)) return 1;
  return 0;
}

export default function SearchResults({
  tools,
  initialQuery,
}: {
  tools: Tool[];
  initialQuery: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setQuery(q);
    setInputValue(q);
  }, [searchParams]);

  const results =
    query.length > 0
      ? tools
          .map((t) => ({ tool: t, s: score(t, query) }))
          .filter((x) => x.s > 0)
          .sort((a, b) => b.s - a.s)
          .map((x) => x.tool)
      : [];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = inputValue.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <>
      <h1 className="search-title">
        {query ? `Results for "${query}"` : "Search tools"}
      </h1>

      <form className="search-form-inline" role="search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by tool, task, or workflow…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
        <button type="submit">Search</button>
      </form>

      {query === "" ? (
        <div className="search-empty">
          <h2>What are you looking for?</h2>
          <p>Try searching for a task like "automate email" or a tool name like "Draftly".</p>
        </div>
      ) : results.length === 0 ? (
        <div className="search-empty">
          <h2>No tools found for &ldquo;{query}&rdquo;</h2>
          <p>
            Try a shorter search term, or{" "}
            <a href="/#categories" style={{ color: "var(--indigo)" }}>
              browse by category
            </a>
            .
          </p>
        </div>
      ) : (
        <>
          <p className="search-meta">
            <strong>{results.length}</strong>{" "}
            {results.length === 1 ? "tool" : "tools"} match &ldquo;{query}&rdquo;
          </p>
          <div className="tool-grid">
            {results.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
