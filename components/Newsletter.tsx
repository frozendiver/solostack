"use client";

import { useState } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER;

type Status = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    if (!ENDPOINT) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section>
      <div className="wrap">
        <div className="newsletter">
          <div>
            <h2>New tools, once a week. No fluff.</h2>
            <p>
              Every new addition to the index, plus the occasional &ldquo;here&apos;s what I
              actually pay for&rdquo; breakdown.
            </p>
          </div>
          {status === "success" ? (
            <p style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
              You&apos;re on the list. Talk soon.
            </p>
          ) : (
            <div>
              {status === "error" && (
                <p style={{ color: "#FECACA", fontSize: "13px", marginBottom: "8px" }}>
                  Something went wrong — please try again.
                </p>
              )}
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="you@yourbusiness.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
