import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo">
              <span className="dot" />
              SoloStack
            </Link>
            <p>
              A curated directory of practical AI tools for solo founders, indie hackers, and
              one-person businesses. Some links may be affiliate links — this never affects which
              tools we list or how we describe them.
            </p>
          </div>
          <div>
            <h4>Workflows</h4>
            <ul>
              <li><Link href="/workflow/write-edit-content">Content & Writing</Link></li>
              <li><Link href="/workflow/automate-admin">Automation</Link></li>
              <li><Link href="/workflow/design-without-designer">Design</Link></li>
              <li><Link href="/workflow/close-more-sales">Sales & Support</Link></li>
            </ul>
          </div>
          <div>
            <h4>Categories</h4>
            <ul>
              <li><Link href="/category/marketing-content">Marketing & Content</Link></li>
              <li><Link href="/category/productivity-automation">Productivity & Automation</Link></li>
              <li><Link href="/category/finance-invoicing">Finance & Invoicing</Link></li>
              <li><Link href="/category/research-insights">Research & Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4>SoloStack</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/submit">Submit a Tool</Link></li>
              <li><Link href="/advertise">Advertise</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SoloStack. All tools listed at our discretion.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
