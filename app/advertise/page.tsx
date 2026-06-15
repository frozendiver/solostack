import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import toolsData from "@/content/tools.json";
import type { Tool } from "@/types";

// Replace these with your actual Stripe Payment Link URLs
const STRIPE_MONTHLY = "https://buy.stripe.com/placeholder-monthly";
const STRIPE_QUARTERLY = "https://buy.stripe.com/placeholder-quarterly";
const STRIPE_ANNUAL = "https://buy.stripe.com/placeholder-annual";

const allTools = toolsData as Tool[];

export const metadata: Metadata = {
  title: "Advertise on SoloStack — Featured Listings for AI Tools",
  description:
    "Get your AI tool in front of solo founders actively building their stack. Featured listings on SoloStack put your tool at the top of relevant category and workflow pages.",
};

const WHAT_YOU_GET = [
  "★ Featured badge on your tool card across all category and workflow pages",
  "Placement in the Editor's Picks section on the homepage",
  "Priority ranking above non-featured tools in search results",
  "Your tool highlighted in the relevant category and workflow listings",
];

const TIERS = [
  {
    name: "Monthly",
    price: "$49",
    period: "/ month",
    billing: "Billed month-to-month. Cancel anytime.",
    cta: "Get Featured",
    href: STRIPE_MONTHLY,
    highlighted: false,
  },
  {
    name: "Quarterly",
    price: "$119",
    period: "/ quarter",
    billing: "Billed once every 3 months. Save 19% vs monthly.",
    cta: "Get Featured — Best Value",
    href: STRIPE_QUARTERLY,
    highlighted: true,
  },
  {
    name: "Annual",
    price: "$349",
    period: "/ year",
    billing: "Billed once per year. Save 40% vs monthly.",
    cta: "Get Featured for a Year",
    href: STRIPE_ANNUAL,
    highlighted: false,
  },
];

const FAQ = [
  {
    q: "How quickly does a Featured listing go live?",
    a: "Within 24 hours of payment, assuming your tool already has a listing on SoloStack. If your tool isn't listed yet, submit it first at /submit — we review submissions within 48 hours.",
  },
  {
    q: "Can I get featured if my tool isn't in the directory yet?",
    a: "Yes — submit your tool first via the Submit page. Once it's approved and listed, reach out and we'll upgrade it to Featured immediately.",
  },
  {
    q: "Do Featured tools rank higher in search?",
    a: "Featured tools are shown before non-featured tools on category and workflow pages. The SoloStack search surface also returns Featured tools with visual prominence.",
  },
  {
    q: "Is this an affiliate relationship?",
    a: "No. Featured listings are paid placements — your tool is listed because you paid for placement, not because we earn a commission on clicks or signups. We're transparent about this in our footer.",
  },
  {
    q: "What if I want to cancel?",
    a: "Monthly plans can be cancelled at any time — your listing stays Featured until the end of the billing period. Quarterly and annual plans are non-refundable but can be cancelled at renewal.",
  },
];

const soraFont = { fontFamily: "var(--font-sora, 'Sora', sans-serif)" } as const;

export default function AdvertisePage() {
  return (
    <>
      <Header toolCount={allTools.length} />
      <main>
        {/* Hero */}
        <section className="page-hero-wrap">
          <div className="page-hero">
            <div className="wrap">
              <div className="section-head" style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", padding: "56px 0 40px" }}>
                <span className="eyebrow" style={{ marginBottom: "16px" }}>Reach solo founders</span>
                <h1 style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "18px" }} className="font-sora">
                  Get your tool in front of builders who buy.
                </h1>
                <p style={{ fontSize: "17px", color: "var(--ink-light)", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto" }}>
                  SoloStack is the curated AI directory for solo founders actively building their stack.
                  A Featured listing puts you at the top of every relevant page — no algorithm, no auction, just placement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section style={{ padding: "0 0 56px" }}>
          <div className="wrap">
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "32px 40px",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "18px" }}>
                What a Featured listing includes
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {WHAT_YOU_GET.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: 1.5 }}>
                    <span style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }}>
                      <Icon name="check" size={15} strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing tiers */}
        <section style={{ padding: "0 0 72px" }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: "36px" }}>
              <span className="section-label">Pricing</span>
              <h2>Simple, transparent pricing</h2>
              <p>All tiers include the same Featured placement — choose the commitment that works for you.</p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  style={{
                    background: tier.highlighted ? "var(--indigo)" : "var(--card)",
                    border: tier.highlighted ? "none" : "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    position: "relative",
                  }}
                >
                  {tier.highlighted && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--amber)",
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: "100px",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-sora, 'Sora', sans-serif)",
                      }}
                    >
                      Most popular
                    </span>
                  )}

                  <div>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: tier.highlighted ? "rgba(255,255,255,0.7)" : "var(--ink-light)",
                        marginBottom: "8px",
                        fontFamily: "var(--font-sora, 'Sora', sans-serif)",
                      }}
                    >
                      {tier.name}
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span
                        style={{
                          fontSize: "40px",
                          fontWeight: 800,
                          lineHeight: 1,
                          color: tier.highlighted ? "#fff" : "var(--ink)",
                          fontFamily: "var(--font-sora, 'Sora', sans-serif)",
                        }}
                      >
                        {tier.price}
                      </span>
                      <span style={{ fontSize: "15px", color: tier.highlighted ? "rgba(255,255,255,0.65)" : "var(--ink-light)" }}>
                        {tier.period}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "12.5px",
                        color: tier.highlighted ? "rgba(255,255,255,0.6)" : "var(--ink-light)",
                        marginTop: "6px",
                      }}
                    >
                      {tier.billing}
                    </p>
                  </div>

                  <a
                    href={tier.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "12px 20px",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: 700,
                      fontSize: "14px",
                      fontFamily: "var(--font-sora, 'Sora', sans-serif)",
                      background: tier.highlighted ? "#fff" : "var(--indigo)",
                      color: tier.highlighted ? "var(--indigo)" : "#fff",
                      textDecoration: "none",
                      transition: "opacity 0.15s ease",
                      marginTop: "auto",
                    }}
                  >
                    {tier.cta}
                    <Icon name="arrow-right" size={14} />
                  </a>
                </div>
              ))}
            </div>

            <p style={{ textAlign: "center", fontSize: "13px", color: "var(--ink-light)", marginTop: "28px" }}>
              Questions? Email{" "}
              <a href="mailto:hello@solostack.co" style={{ color: "var(--indigo)" }}>
                hello@solostack.co
              </a>{" "}
              before purchasing.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "0 0 80px" }}>
          <div className="wrap">
            <div style={{ maxWidth: "680px", margin: "0 auto" }}>
              <div className="section-head" style={{ textAlign: "left", maxWidth: "none", marginBottom: "32px" }}>
                <span className="section-label">FAQ</span>
                <h2 style={{ fontSize: "26px" }}>Common questions</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {FAQ.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      borderTop: "1px solid var(--border)",
                      padding: "22px 0",
                    }}
                  >
                    <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "8px", ...soraFont }}>
                      {item.q}
                    </p>
                    <p style={{ fontSize: "14px", color: "var(--ink-light)", lineHeight: 1.6 }}>
                      {item.a}
                    </p>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "22px" }} />
              </div>

              <div
                style={{
                  background: "var(--indigo-pale)",
                  borderRadius: "var(--radius)",
                  padding: "28px 32px",
                  marginTop: "40px",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "6px", ...soraFont }}>
                    Tool not listed yet?
                  </p>
                  <p style={{ fontSize: "13.5px", color: "var(--ink-light)", lineHeight: 1.5 }}>
                    Submit it for free review first. Once approved, we can upgrade it to Featured immediately.
                  </p>
                </div>
                <Link
                  href="/submit"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "11px 20px",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: 700,
                    fontSize: "14px",
                    background: "var(--indigo)",
                    color: "#fff",
                    textDecoration: "none",
                    flexShrink: 0,
                    ...soraFont,
                  }}
                >
                  Submit a Tool
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
