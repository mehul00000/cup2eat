import { useState } from "react";
import { OFFER, products, MSG_ORDER, MSG_GENERAL, waLink, FAQS, asset } from "../data";
import { Arrow, Check, Cup, Leaf, Spark, Store, Truck, Users, WhatsApp } from "../icons";
import { ArrowLink, Go, Reveal, SectionHead } from "../chrome";

const WHY: [React.ReactNode, string, string][] = [
  [<Cup size={24} key="i" />, "A cup you can eat", "Enjoy your drink, then eat the cup — a crisp, dessert-style finish to every serve."],
  [<Spark size={24} key="i" />, "Three signature flavours", "Rich Chocolate, classic Vanilla and Elaichi — a cardamom cup made for chai."],
  [<Leaf size={24} key="i" />, "Less single-use waste", "An edible, consumable format designed to leave no cup behind."],
  [<Store size={24} key="i" />, "Made for businesses", "Cafes, restaurants, hotels and caterers serve something guests remember."],
  [<Truck size={24} key="i" />, "Pan-India wholesale supply", "396-cup packs advertised with delivery included, everywhere in India."],
  [<Users size={24} key="i" />, "Personal support", "Real conversations on WhatsApp and the phone — no bots, no waiting queues."],
];

const APP_PREVIEW: [React.ReactNode, string, string][] = [
  [<Cup size={22} key="a" />, "Coffee & chai", "Serve espresso, latte or elaichi chai in a cup your guests can finish."],
  [<Spark size={22} key="b" />, "Ice cream & desserts", "Sundaes, mousse and dessert shots with a delicious, edible vessel."],
  [<Store size={22} key="c" />, "Cafes & restaurants", "A signature serving experience customers photograph and share."],
  [<Users size={22} key="d" />, "Events & catering", "Weddings, launches and catering with a talking point built in."],
];

export default function Home({ go }: { go: Go }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <Reveal>
              <p className="hero-eyebrow">
                Introducing the edible cup · Made in India
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1>
                Eat your <i>drink.</i>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero-tagline">A delicious &amp; sustainable innovation.</p>
            </Reveal>
            <Reveal delay={220}>
              <p className="hero-lede">
                Discover a new way to enjoy your favourite beverages with innovative edible cups
                designed to bring flavour and creativity to every serving.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="btn-row">
                <button type="button" className="btn btn-gold" onClick={() => go("products")}>
                  Explore Products <Arrow size={17} />
                </button>
                <button type="button" className="btn btn-outline" onClick={() => go("wholesale")}>
                  Order Wholesale
                </button>
              </div>
            </Reveal>
            <Reveal delay={380}>
              <div className="hero-stats">
                <div>
                  <b>3</b>
                  <span>Flavours</span>
                </div>
                <div>
                  <b>{OFFER.perCup}</b>
                  <span>Per cup, wholesale</span>
                </div>
                <div>
                  <b>396</b>
                  <span>Cups per pack</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="hero-visual">
            <Reveal delay={200} className="hero-visual-reveal">
              <div className="hero-frame">
                <img
                  src={asset("img/hero-cups.jpg")}
                  alt="Three CUP2EAT edible cups in Chocolate, Vanilla and Elaichi, filled with coffee, chai and ice cream"
                />
              </div>
              <div className="hero-badge">
                <Cup size={22} />
                <span>
                  100% edible<em>·</em>zero washing up
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Wholesale offer band ---------- */}
      <section className="offer-band">
        <Reveal className="offer-inner">
          <p className="eyebrow">Wholesale offer · All India delivery</p>
          <div className="offer-main">
            <div className="offer-price">
              <span className="offer-currency">₹</span>
              <b>3,999</b>
            </div>
            <div className="offer-copy">
              <h2>
                396 edible cups, <i>one flat price.</i>
              </h2>
              <p>
                Approximately <b>{OFFER.perCup} per cup</b> — an affordable premium serving for
                your cafe, restaurant, hotel or next event. Delivery is advertised as included
                across India.
              </p>
            </div>
            <a
              className="btn btn-dark"
              href={waLink(MSG_ORDER)}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsApp size={17} /> Order Now
            </a>
          </div>
          <ul className="offer-points">
            <li>
              <Check size={15} /> {OFFER.quantity} cups per wholesale pack
            </li>
            <li>
              <Check size={15} /> Chocolate · Vanilla · Elaichi
            </li>
            <li>
              <Check size={15} /> Final terms confirmed with every order
            </li>
          </ul>
        </Reveal>
      </section>

      {/* ---------- Product showcase ---------- */}
      <section className="section products-showcase">
        <SectionHead
          eyebrow="The collection"
          title={
            <>
              Three flavours. <i>One delicious idea.</i>
            </>
          }
          intro="Every CUP2EAT cup is made to hold your serving — and then become the dessert."
        />
        <div className="product-grid">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <article className="product-card">
                <button
                  type="button"
                  className="card-media"
                  onClick={() => go("product", p.slug)}
                  aria-label={`View ${p.name} edible cup details`}
                >
                  <img src={p.card} alt={`${p.name} flavour edible cup`} loading="lazy" />
                  <span className="card-swash" style={{ background: p.tone }}>
                    {p.appearance}
                  </span>
                </button>
                <div className="card-body">
                  <p className="card-flavour">{p.tagline}</p>
                  <h3>{p.name} Cup</h3>
                  <p className="card-pairs">{p.pairs}</p>
                  <div className="card-actions">
                    <button type="button" className="btn btn-ghost-dark" onClick={() => go("product", p.slug)}>
                      View Details
                    </button>
                    <a
                      className="btn btn-outline-sm"
                      href={waLink(
                        `Hello CUP2EAT,\n\nI am interested in your ${p.name} edible cups.\n\nPlease share product specifications, pricing and ordering details.\n\nThank you.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <WhatsApp size={15} /> Enquire
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Why CUP2EAT ---------- */}
      <section className="section why-section">
        <SectionHead
          light
          eyebrow="Why CUP2EAT?"
          title={
            <>
              Not your ordinary <i>cup.</i>
            </>
          }
          intro="A little innovation that changes how a drink ends — for customers, and for the planet."
        />
        <div className="why-grid">
          {WHY.map(([icon, title, text], i) => (
            <Reveal key={i} delay={(i % 3) * 90}>
              <article className="why-card">
                <span className="why-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Applications preview ---------- */}
      <section className="section app-preview">
        <SectionHead
          eyebrow="Applications"
          title={
            <>
              Pour. Sip. <i>Crunch.</i>
            </>
          }
          intro="One cup, endless moments — from morning filter coffee to wedding dessert counters."
        />
        <div className="app-preview-grid">
          {APP_PREVIEW.map(([icon, title, text], i) => (
            <Reveal key={i} delay={i * 80}>
              <article className="app-preview-card">
                <span className="app-preview-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="center-cta">
          <button type="button" className="btn btn-ghost-dark" onClick={() => go("applications")}>
            Explore all applications <Arrow size={16} />
          </button>
        </Reveal>
      </section>

      {/* ---------- Wholesale B2B ---------- */}
      <section className="b2b-band">
        <Reveal className="b2b-media">
          <img
            src={asset("img/wholesale-home.jpg")}
            alt="A restaurant service counter — CUP2EAT wholesale for businesses"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={120} className="b2b-copy">
          <p className="eyebrow">For cafes, hotels &amp; events</p>
          <h2>
            Bring something different <i>to your business.</i>
          </h2>
          <p>
            Give your customers a memorable experience with innovative edible cups. Connect with
            CUP2EAT for wholesale requirements and bulk business enquiries.
          </p>
          <ul>
            <li>Cafes &amp; coffee shops</li>
            <li>Restaurants &amp; hotels</li>
            <li>Caterers &amp; event organisers</li>
            <li>Distributors &amp; retailers</li>
          </ul>
          <button type="button" className="btn btn-gold" onClick={() => go("wholesale")}>
            Request Wholesale Quote <Arrow size={17} />
          </button>
        </Reveal>
      </section>

      {/* ---------- Brand intro ---------- */}
      <section className="brand-band">
        <Reveal className="brand-media">
          <img
            src={asset("img/brand-story.jpg")}
            alt="Warm hospitality moment — the idea behind CUP2EAT"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={120} className="brand-copy">
          <p className="eyebrow">The brand</p>
          <h2>
            Born from one simple <i>question.</i>
          </h2>
          <p>
            Why should the experience end at the last sip? CUP2EAT turns the final moment of every
            drink into something worth savouring — a crisp, flavoured cup you eat, not throw.
          </p>
          <p>
            We are building a premium Indian brand that makes sustainability feel delicious, one
            cup at a time.
          </p>
          <ArrowLink onClick={() => go("about")}>Read our story</ArrowLink>
        </Reveal>
      </section>

      {/* ---------- FAQ preview ---------- */}
      <section className="section faq-section">
        <SectionHead
          eyebrow="Good to know"
          title={
            <>
              Questions, <i>answered.</i>
            </>
          }
        />
        <div className="faq-wrap">
          {FAQS.slice(0, 5).map(([q, a], i) => (
            <Reveal key={q} delay={i * 60}>
              <div className={`faq-item ${openFaq === i ? "open" : ""}`}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span>{q}</span>
                  <b aria-hidden="true">{openFaq === i ? "−" : "+"}</b>
                </button>
                {openFaq === i && <p>{a}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="center-cta">
          <button type="button" className="btn btn-ghost-dark" onClick={() => go("faq")}>
            See all questions <Arrow size={16} />
          </button>
        </Reveal>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="final-cta">
        <img
          className="final-cta-bg"
          src={asset("img/final-cta.jpg")}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <Reveal className="final-cta-inner">
          <p className="eyebrow">One last thing</p>
          <h2>
            Ready to eat <i>your drink?</i>
          </h2>
          <div className="btn-row center">
            <a className="btn btn-gold" href={waLink(MSG_GENERAL)} target="_blank" rel="noreferrer">
              <WhatsApp size={17} /> Order Now
            </a>
            <button type="button" className="btn btn-outline" onClick={() => go("contact")}>
              Contact Us
            </button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
