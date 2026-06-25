"use client";

import { useEffect, useRef } from "react";

export default function BeehiivNewsletter() {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!embedRef.current) return;
    const script = document.createElement("script");
    script.src = "https://subscribe-forms.beehiiv.com/v3/loader.js";
    script.async = true;
    script.setAttribute("data-beehiiv-form", "e73e0637-90fb-4b60-bec1-fc508b7ef184");
    embedRef.current.appendChild(script);
  }, []);

  return (
    <section style={{ background: "#1B2340" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <h2
          style={{
            color: "#fff",
            fontSize: "clamp(26px, 3.6vw, 36px)",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          Get the weekly AI tool roundup
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: "15.5px",
            maxWidth: "480px",
            margin: "0 auto 36px",
            lineHeight: 1.6,
          }}
        >
          A Navy Special Operations Veteran reviews AI tools for solopreneurs.
          One question: does it actually work?
        </p>
        <div ref={embedRef} />
      </div>
    </section>
  );
}
