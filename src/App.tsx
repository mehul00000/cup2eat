import { useCallback, useEffect, useState } from "react";
import { Footer, Go, Header, Page, TITLES, WhatsAppFab } from "./chrome";
import { Intro } from "./Intro";
import Home from "./pages/Home";
import { ProductPage, ProductsPage } from "./pages/Products";
import Wholesale from "./pages/Wholesale";
import { AboutPage, ApplicationsPage, ContactPage, FaqPage, PolicyPage } from "./pages/Misc";

export default function App() {
  // Intro brand film plays on every page load, then reveals the website.
  const [showIntro, setShowIntro] = useState(true);
  const [page, setPage] = useState<Page>("home");
  const [slug, setSlug] = useState("chocolate");

  useEffect(() => {
    document.title = TITLES[page];
  }, [page]);

  const go: Go = useCallback((next, s) => {
    setPage(next);
    if (s) setSlug(s);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}

      <div className="app">
        <Header page={page} go={go} />
        <main id="main">
          {page === "home" && <Home go={go} />}
          {page === "products" && <ProductsPage go={go} />}
          {page === "product" && <ProductPage slug={slug} go={go} />}
          {page === "wholesale" && <Wholesale />}
          {page === "applications" && <ApplicationsPage />}
          {page === "about" && <AboutPage go={go} />}
          {page === "contact" && <ContactPage />}
          {page === "faq" && <FaqPage go={go} />}
          {page === "privacy" && <PolicyPage which="privacy" />}
          {page === "terms" && <PolicyPage which="terms" />}
          {page === "shipping" && <PolicyPage which="shipping" />}
          {page === "refunds" && <PolicyPage which="refunds" />}
        </main>
        <Footer go={go} />
        <WhatsAppFab />
      </div>
    </>
  );
}
