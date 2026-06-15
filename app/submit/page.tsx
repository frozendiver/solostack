import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubmitForm from "@/components/SubmitForm";
import Icon from "@/components/Icon";
import categoriesData from "@/content/categories.json";
import toolsData from "@/content/tools.json";
import type { Category, Tool } from "@/types";

const categories = categoriesData as Category[];
const allTools = toolsData as Tool[];

export const metadata: Metadata = {
  title: "Submit a Tool — SoloStack",
  description:
    "Know an AI tool that belongs in the SoloStack directory? Submit it for review — we check every submission personally.",
};

const soraFont = { fontFamily: "var(--font-sora, 'Sora', sans-serif)" } as const;

const CRITERIA = [
  "It solves a real problem for solo founders or one-person businesses",
  "It's actively maintained and publicly available",
  "The pricing is transparent and listed on the website",
  "You've used it yourself, or have first-hand knowledge of it",
];

const WONT_LIST = [
  "General-purpose AI assistants (ChatGPT, Claude, Gemini) — too broad",
  "Enterprise-only tools with no self-serve option",
  "Tools in closed beta with no public access",
];

export default function SubmitPage() {
  return (
    <>
      <Header toolCount={allTools.length} />
      <main className="py-14 pb-20">
        <div className="wrap">
          {/* Two-column layout: form + sidebar */}
          <div className="grid items-start gap-16 grid-cols-1 lg:grid-cols-[1fr_340px]">
            {/* Left: form */}
            <SubmitForm categories={categories} />

            {/* Right: sidebar — hidden on small screens */}
            <aside className="hidden lg:flex flex-col gap-5">
              {/* What we look for */}
              <div className="bg-brand-card border border-brand-border rounded-xl p-6">
                <h3 className="text-[15px] font-bold mb-3" style={soraFont}>
                  What we look for
                </h3>
                <ul className="list-none flex flex-col gap-2.5">
                  {CRITERIA.map((item, i) => (
                    <li key={i} className="flex gap-2 items-start text-[13.5px] text-brand-ink-light leading-snug">
                      <span className="text-brand-green flex-shrink-0 mt-0.5">
                        <Icon name="check" size={14} strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What we won't list */}
              <div className="bg-brand-card border border-brand-border rounded-xl p-6">
                <h3 className="text-[15px] font-bold mb-3" style={soraFont}>
                  What we won&apos;t list
                </h3>
                <ul className="list-none flex flex-col gap-2.5">
                  {WONT_LIST.map((item, i) => (
                    <li key={i} className="flex gap-2 items-start text-[13.5px] text-brand-ink-light leading-snug">
                      <span className="text-brand-ink-light flex-shrink-0 mt-0.5">
                        <Icon name="x" size={14} strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured upsell */}
              <div className="bg-brand-indigo-pale border border-brand-indigo-pale rounded-xl p-6">
                <h3 className="text-[15px] font-bold mb-2" style={soraFont}>
                  Want a Featured listing?
                </h3>
                <p className="text-[13.5px] text-brand-ink-light mb-4 leading-snug">
                  Featured tools appear at the top of category pages and in the homepage
                  Editor&apos;s Picks section.
                </p>
                <Link
                  href="/advertise"
                  className="inline-flex items-center gap-1.5 text-[14px] font-bold text-brand-indigo"
                  style={soraFont}
                >
                  See featured options
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
