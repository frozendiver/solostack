"use client";

import { useState } from "react";
import Icon from "./Icon";
import type { Category } from "@/types";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_SUBMIT;

type Status = "idle" | "loading" | "success" | "error";

const PRICING_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium (free tier + paid plans)" },
  { value: "paid", label: "Paid only" },
  { value: "trial", label: "Free trial, then paid" },
];

const soraFont = { fontFamily: "var(--font-sora, 'Sora', sans-serif)" } as const;

const inputCls =
  "w-full border border-brand-border rounded-lg px-3.5 py-[11px] text-[14.5px] bg-brand-bg text-brand-ink outline-none transition-colors duration-150 focus:border-brand-indigo focus:bg-brand-card";

const selectCls =
  "w-full border border-brand-border rounded-lg pl-3.5 pr-8 py-[11px] text-[14.5px] bg-brand-bg text-brand-ink outline-none transition-colors duration-150 focus:border-brand-indigo focus:bg-brand-card cursor-pointer";

export default function SubmitForm({ categories }: { categories: Category[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({
    toolName: "",
    toolUrl: "",
    tagline: "",
    category: "",
    pricingModel: "",
    startingPrice: "",
    yourName: "",
    yourEmail: "",
    notes: "",
  });

  function set(key: keyof typeof fields) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setFields((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ENDPOINT) { setStatus("success"); return; }
    setStatus("loading");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Tool name": fields.toolName,
          "Tool URL": fields.toolUrl,
          Tagline: fields.tagline,
          Category: fields.category,
          "Pricing model": fields.pricingModel,
          "Starting price": fields.startingPrice,
          "Your name": fields.yourName,
          "Your email": fields.yourEmail,
          Notes: fields.notes,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-brand-card border border-brand-border rounded-xl p-10">
        <div className="text-center py-12 px-6">
          <div className="w-14 h-14 rounded-full bg-brand-green-pale text-brand-green flex items-center justify-center mx-auto mb-5">
            <Icon name="check" size={26} strokeWidth={2.5} />
          </div>
          <h3 className="text-[22px] font-bold mb-2" style={soraFont}>
            Got it — thanks!
          </h3>
          <p className="text-[15px] text-brand-ink-light">
            We review every submission personally. If{" "}
            {fields.toolName || "your tool"} makes the cut we&apos;ll add it to the
            index and let you know.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-10">
      <h1
        className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight mb-1.5"
        style={soraFont}
      >
        Submit a tool
      </h1>
      <p className="text-[15px] text-brand-ink-light mb-8">
        Know an AI tool that belongs here? Tell us about it — we review every submission.
      </p>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg text-red-700 text-[13.5px] px-3.5 py-2.5 mb-5">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="toolName" className="text-[12.5px] font-bold uppercase tracking-[0.04em] text-brand-ink" style={soraFont}>
              Tool name <span className="text-brand-indigo">*</span>
            </label>
            <input id="toolName" className={inputCls} type="text" placeholder="e.g. Draftly" value={fields.toolName} onChange={set("toolName")} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="toolUrl" className="text-[12.5px] font-bold uppercase tracking-[0.04em] text-brand-ink" style={soraFont}>
              Tool URL <span className="text-brand-indigo">*</span>
            </label>
            <input id="toolUrl" className={inputCls} type="url" placeholder="https://example.com" value={fields.toolUrl} onChange={set("toolUrl")} required />
          </div>
        </div>

        {/* Tagline */}
        <div className="flex flex-col gap-1.5 mb-5">
          <label htmlFor="tagline" className="text-[12.5px] font-bold uppercase tracking-[0.04em] text-brand-ink" style={soraFont}>
            One-line description <span className="text-brand-indigo">*</span>
          </label>
          <input id="tagline" className={inputCls} type="text" placeholder="What does it do in plain English?" value={fields.tagline} onChange={set("tagline")} required />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="text-[12.5px] font-bold uppercase tracking-[0.04em] text-brand-ink" style={soraFont}>
              Best category <span className="text-brand-indigo">*</span>
            </label>
            <select id="category" className={selectCls} value={fields.category} onChange={set("category")} required>
              <option value="">Select a category…</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pricingModel" className="text-[12.5px] font-bold uppercase tracking-[0.04em] text-brand-ink" style={soraFont}>
              Pricing model <span className="text-brand-indigo">*</span>
            </label>
            <select id="pricingModel" className={selectCls} value={fields.pricingModel} onChange={set("pricingModel")} required>
              <option value="">Select…</option>
              {PRICING_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Starting price */}
        <div className="flex flex-col gap-1.5 mb-5">
          <label htmlFor="startingPrice" className="text-[12.5px] font-bold uppercase tracking-[0.04em] text-brand-ink" style={soraFont}>
            Starting price
          </label>
          <input id="startingPrice" className={inputCls} type="text" placeholder='e.g. "Free", "From $9/mo"' value={fields.startingPrice} onChange={set("startingPrice")} />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="yourName" className="text-[12.5px] font-bold uppercase tracking-[0.04em] text-brand-ink" style={soraFont}>
              Your name <span className="text-brand-indigo">*</span>
            </label>
            <input id="yourName" className={inputCls} type="text" placeholder="Jane Smith" value={fields.yourName} onChange={set("yourName")} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="yourEmail" className="text-[12.5px] font-bold uppercase tracking-[0.04em] text-brand-ink" style={soraFont}>
              Your email <span className="text-brand-indigo">*</span>
            </label>
            <input id="yourEmail" className={inputCls} type="email" placeholder="jane@example.com" value={fields.yourEmail} onChange={set("yourEmail")} required />
            <span className="text-[12px] text-brand-ink-light">We&apos;ll only use this to follow up on your submission.</span>
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-1.5 mb-5">
          <label htmlFor="notes" className="text-[12.5px] font-bold uppercase tracking-[0.04em] text-brand-ink" style={soraFont}>
            Why should it be listed?
          </label>
          <textarea
            id="notes"
            className="w-full border border-brand-border rounded-lg px-3.5 py-[11px] text-[14.5px] bg-brand-bg text-brand-ink outline-none transition-colors duration-150 focus:border-brand-indigo focus:bg-brand-card resize-y min-h-[100px] leading-relaxed"
            placeholder="What makes it stand out for solo founders? Have you used it yourself?"
            value={fields.notes}
            onChange={set("notes")}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-brand-indigo text-white rounded-lg py-3.5 px-6 text-[15px] font-bold cursor-pointer transition-colors duration-150 hover:bg-brand-indigo-light disabled:opacity-60 disabled:cursor-not-allowed mt-2 border-0"
          style={soraFont}
        >
          {status === "loading" ? "Submitting…" : "Submit for review"}
        </button>
      </form>
    </div>
  );
}
