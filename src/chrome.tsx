import { useEffect, useRef, useState } from "react";
import { products, PHONE_DISPLAY, PHONE_TEL, MSG_GENERAL, waLink } from "./data";
import { Arrow, Close, Menu, Phone, WhatsApp } from "./icons";

export type Page =
  | "home"
  | "products"
  | "product"
  | "wholesale"
  | "applications"
  | "about"
  | "contact"
  | "faq"
  | "privacy"
  | "terms"
  | "shipping"
  | "refunds";

export const TITLES: Record<Page, string> = {
  home: "CUP2EAT — Eat Your Drink! | Premium Edible Cups India",
  products: "Our Flavours — CUP2EAT Edible Cups",
  product: "Flavour Details — CUP2EAT Edible Cups",
  wholesale: "Wholesale Edible Cups — CUP2EAT",
  applications: "Applications — CUP2EAT Edible Cups",
  about: "About CUP2EAT — Our Story",
  contact: "Contact CUP2EAT — 98181 92575",
  faq: "Frequently Asked Questions — CUP2EAT",
  privacy: "Privacy Policy — CUP2EAT",
  terms: "Terms & Conditions — CUP2EAT",
  shipping: "Shipping & Delivery Policy — CUP2EAT",
  refunds: "Refund & Cancellation Policy — CUP2EAT",
};

export type Go = (page: Page, slug?: string) => void;

/* ---------- Logo ---------- */

export function Logo({ light = false, onHome }: { light?: boolean; onHome?: () => void }) {
  return (
    <button
      type="button"
      className={`logo ${light ? "logo-light" : ""}`}
      onClick={onHome}
      aria-label="CUP2EAT — go to home"
    >
      CUP<b>2</b>EAT
    </button>
  );
}

/* ---------- Scroll reveal ---------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ---------- Section heading helper ---------- */

export function SectionHead({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  light?: boolean;
}) {
  return (
    <Reveal className={`section-head ${light ? "on-dark" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  );
}

/* ---------- Header ---------- */

const NAV: [string, Page][] = [
  ["Home", "home"],
  ["Products", "products"],
  ["Wholesale", "wholesale"],
  ["Applications", "applications"],
  ["About Us", "about"],
  ["Contact", "contact"],
];

export function Header({ page, go }: { page: Page; go: Go }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const jump = (p: Page) => {
    go(p);
    setOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Logo light onHome={() => jump("home")} />
        <nav className={`site-nav ${open ? "open" : ""}`} aria-label="Primary">
          {NAV.map(([label, p]) => (
            <button
              key={p}
              type="button"
              className={page === p ? "active" : ""}
              onClick={() => jump(p)}
            >
              {label}
            </button>
          ))}
          <div className="nav-mobile-foot">
            <a href={PHONE_TEL} className="nav-phone">
              <Phone size={16} /> {PHONE_DISPLAY}
            </a>
            <a
              href={waLink(MSG_GENERAL)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold btn-sm"
            >
              <WhatsApp size={16} /> Order Now
            </a>
          </div>
        </nav>
        <div className="header-actions">
          <a
            href={waLink(MSG_GENERAL)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-gold header-cta"
          >
            <WhatsApp size={16} />
            Order Now
          </a>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Floating WhatsApp ---------- */

export function WhatsAppFab() {
  return (
    <a
      className="wa-fab"
      href={waLink(MSG_GENERAL)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with CUP2EAT on WhatsApp"
    >
      <WhatsApp size={26} />
    </a>
  );
}

/* ---------- Footer ---------- */

export function Footer({ go }: { go: Go }) {
  const year = new Date().getFullYear();
  const link = (p: Page, label: string) => (
    <button type="button" onClick={() => go(p)}>
      {label}
    </button>
  );
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo light onHome={() => go("home")} />
          <p className="footer-tagline">Eat Your Drink!</p>
          <p className="footer-note">
            A delicious &amp; sustainable innovation — premium edible cups in Chocolate, Vanilla and
            Elaichi.
          </p>
          <div className="footer-contact">
            <a href={PHONE_TEL} className="footer-phone">
              <Phone size={16} /> {PHONE_DISPLAY}
            </a>
            <a href={waLink(MSG_GENERAL)} target="_blank" rel="noreferrer" className="footer-wa">
              <WhatsApp size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-col">
          <b>Explore</b>
          {link("home", "Home")}
          {link("products", "Products")}
          {link("wholesale", "Wholesale")}
          {link("applications", "Applications")}
          {link("about", "About Us")}
          {link("contact", "Contact")}
        </div>

        <div className="footer-col">
          <b>Our Flavours</b>
          {products.map((p) => (
            <button key={p.slug} type="button" onClick={() => go("product", p.slug)}>
              {p.name} Cup
            </button>
          ))}
        </div>

        <div className="footer-col">
          <b>Information</b>
          {link("faq", "FAQ")}
          {link("privacy", "Privacy Policy")}
          {link("terms", "Terms & Conditions")}
          {link("shipping", "Shipping & Delivery")}
          {link("refunds", "Refund & Cancellation")}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} CUP2EAT. All rights reserved.</span>
        <span>Made in India · Served everywhere</span>
      </div>
    </footer>
  );
}

/* ---------- Sub-page hero ---------- */

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  image?: string;
  alt?: string;
}) {
  return (
    <section className={`page-hero ${image ? "" : "no-image"}`}>
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-intro">{intro}</p>
      </div>
      {image && <div className="page-hero-media">{<img src={image} alt={alt ?? ""} loading="eager" />}</div>}
    </section>
  );
}

export function ArrowLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className="arrow-link" onClick={onClick}>
      {children} <Arrow size={16} />
    </button>
  );
}
