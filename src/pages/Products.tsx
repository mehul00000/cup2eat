import { OFFER, productBySlug, productMsg, products, waLink, asset } from "../data";
import { Arrow, Check, WhatsApp } from "../icons";
import { ArrowLink, Go, PageHero, Reveal, SectionHead } from "../chrome";

/* ---------- Products listing ---------- */

export function ProductsPage({ go }: { go: Go }) {
  return (
    <>
      <PageHero
        eyebrow="Our flavours"
        title={
          <>
            The cup <i>collection.</i>
          </>
        }
        intro="Three signature flavours, each made to hold your beverage or dessert — and finish it deliciously."
        image={asset("img/products-hero.jpg")}
        alt="Espresso being prepared — edible cups pair with every coffee ritual"
      />

      <section className="section shop-list">
        {products.map((p, i) => (
          <Reveal key={p.slug}>
            <article className={`shop-row ${i % 2 ? "flip" : ""}`}>
              <button
                type="button"
                className="shop-media"
                onClick={() => go("product", p.slug)}
                aria-label={`Open ${p.name} edible cup details`}
              >
                <img src={p.shop} alt={`${p.name} edible cup serving`} loading="lazy" />
                <span className="card-swash" style={{ background: p.tone }}>
                  {p.appearance}
                </span>
              </button>
              <div className="shop-copy">
                <p className="eyebrow">{p.tagline}</p>
                <h2>
                  {p.name} <i>edible cup.</i>
                </h2>
                <p>{p.description}</p>
                <ul className="chip-row">
                  {p.applications.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <div className="btn-row">
                  <button type="button" className="btn btn-dark" onClick={() => go("product", p.slug)}>
                    View Product <Arrow size={16} />
                  </button>
                  <a
                    className="btn btn-outline-ink"
                    href={waLink(productMsg(p.name))}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsApp size={16} /> Enquire
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="offer-strip">
        <Reveal className="offer-strip-inner">
          <div>
            <p className="eyebrow">Wholesale</p>
            <h2>
              All flavours available at <i>{OFFER.price}</i> for {OFFER.quantity} cups.
            </h2>
          </div>
          <button type="button" className="btn btn-gold" onClick={() => go("wholesale")}>
            Get wholesale pricing <Arrow size={16} />
          </button>
        </Reveal>
      </section>
    </>
  );
}

/* ---------- Product detail ---------- */

export function ProductPage({ slug, go }: { slug: string; go: Go }) {
  const p = productBySlug(slug);

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <button type="button" onClick={() => go("home")}>Home</button>
        <span>/</span>
        <button type="button" onClick={() => go("products")}>Products</button>
        <span>/</span>
        <b>{p.name}</b>
      </nav>

      <section className="pdp">
        <Reveal className="pdp-gallery">
          <figure>
            <img src={p.gallery[0]} alt={`${p.name} edible cup — close view`} />
            <figcaption>{p.tagline}</figcaption>
          </figure>
          <figure>
            <img src={p.gallery[1]} alt={`${p.name} edible cup — serving idea`} />
            <figcaption>Made for {p.applications[0].toLowerCase()} moments</figcaption>
          </figure>
        </Reveal>

        <Reveal delay={100} className="pdp-info">
          <p className="eyebrow">{p.appearance} · {p.name} flavour</p>
          <h1>
            {p.name} <i>edible cup.</i>
          </h1>
          <p className="pdp-lede">{p.description}</p>

          <div className="pdp-specs">
            <div>
              <b>Appearance</b>
              <span>{p.appearance}</span>
            </div>
            <div>
              <b>Flavour family</b>
              <span>{p.name}</span>
            </div>
            <div>
              <b>Pairs with</b>
              <span>{p.pairs}</span>
            </div>
            <div>
              <b>Ingredients &amp; allergens</b>
              <span>Shared with every quotation and printed on the pack</span>
            </div>
          </div>

          <ul className="pdp-apps">
            {p.applications.map((a) => (
              <li key={a}>
                <Check size={14} /> {a}
              </li>
            ))}
          </ul>

          <div className="btn-row pdp-ctas">
            <a className="btn btn-gold" href={waLink(productMsg(p.name))} target="_blank" rel="noreferrer">
              <WhatsApp size={17} /> Enquire on WhatsApp
            </a>
            <button type="button" className="btn btn-outline-ink" onClick={() => go("wholesale")}>
              Request Bulk Quote
            </button>
          </div>
          <p className="pdp-note">
            Product specifications are confirmed with every enquiry — we never guess on food
            details. <ArrowLink onClick={() => go("contact")}>Talk to our team</ArrowLink>
          </p>
        </Reveal>
      </section>

      <section className="section related">
        <SectionHead
          eyebrow="Also try"
          title={
            <>
              More <i>flavours.</i>
            </>
          }
        />
        <div className="product-grid three">
          {products
            .filter((x) => x.slug !== p.slug)
            .map((x) => (
              <Reveal key={x.slug}>
                <button
                  type="button"
                  className="mini-card"
                  style={{ background: `linear-gradient(135deg, ${x.tone}, #2a1a0c)` }}
                  onClick={() => go("product", x.slug)}
                >
                  <span className="mini-initial">{x.name.charAt(0)}</span>
                  <div>
                    <h3>{x.name} Cup</h3>
                    <span className="mini-link">
                      View details <Arrow size={14} />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
        </div>
      </section>
    </>
  );
}
