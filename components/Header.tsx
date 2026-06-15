import Link from "next/link";

export default function Header({ toolCount = 127 }: { toolCount?: number }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <span className="dot" />
          SoloStack
        </Link>
        <nav className="nav-links">
          <Link href="/#workflows">Browse by Workflow</Link>
          <Link href="/#categories">All Categories</Link>
          <Link href="/submit">Submit a Tool</Link>
          <span className="nav-badge">● {toolCount} tools curated</span>
          <Link href="/submit" className="nav-cta">Submit a Tool</Link>
        </nav>
      </div>
    </header>
  );
}
