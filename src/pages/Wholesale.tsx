import { FormEvent, useState } from "react";
import {
  BUSINESS_TYPES,
  OFFER,
  STATES,
  isEmail,
  isPhone,
  saveEnquiry,
  asset,
  waLink,
} from "../data";
import { Check, Phone, Store, Truck, Users, WhatsApp } from "../icons";
import { PageHero, Reveal, SectionHead } from "../chrome";

const SEGMENTS: [React.ReactNode, string, string][] = [
  [<Store size={22} key="a" />, "Cafes & coffee shops", "A signature serving your regulars photograph, share and come back for."],
  [<Users size={22} key="b" />, "Hotels & restaurants", "Premium presentation for in-room dining, desserts and welcome drinks."],
  [<Truck size={22} key="c" />, "Caterers & events", "Weddings, corporate launches and catering with a built-in talking point."],
  [<Phone size={22} key="d" />, "Distributors & retailers", "A fast-moving, differentiated product line for the food-service market."],
];

export default function Wholesale() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ ref: string; wa: string } | null>(null);
  const [sending, setSending] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const fd = new FormData(f);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const flavours = fd.getAll("flavours").map(String);
    data.flavours = flavours.join("|");

    const errs: Record<string, string> = {};
    if (!data.full_name?.trim()) errs.full_name = "Please enter your name.";
    if (!data.business_name?.trim()) errs.business_name = "Please enter your business name.";
    if (!isPhone(data.phone ?? "")) errs.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!isEmail(data.email ?? "")) errs.email = "Enter a valid email address.";
    if (!data.business_type) errs.business_type = "Select your business type.";
    const qty = Number(data.quantity);
    if (!data.quantity || Number.isNaN(qty) || qty < 100) errs.quantity = "Wholesale orders start from 100 cups.";
    if (!flavours.length) errs.flavours = "Select at least one flavour.";
    if (!data.city?.trim()) errs.city = "Please enter your delivery city.";
    if (!data.state) errs.state = "Select your state.";

    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    const entry = saveEnquiry("wholesale", {
      ...data,
      flavours: flavours.join(", "),
    });
    const wa = waLink(
      `Hello CUP2EAT,\n\nNew wholesale enquiry (${entry.ref}):\n\n` +
        `Name: ${data.full_name}\nBusiness: ${data.business_name} (${data.business_type})\n` +
        `Phone: ${data.phone}\nEmail: ${data.email}\nRequired Quantity: ${data.quantity} cups\n` +
        `Preferred Flavours: ${flavours.join(", ")}\nLocation: ${data.city}, ${data.state}\n` +
        (data.requirements ? `Requirements: ${data.requirements}\n` : "") +
        `\nPlease share the wholesale quotation.\n\nThank you.`,
    );
    window.setTimeout(() => {
      setSending(false);
      setDone({ ref: entry.ref, wa });
      f.reset();
      window.scrollTo({ top: f.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
    }, 550);
  };

  return (
    <>
      <PageHero
        eyebrow="Wholesale · B2B"
        title={
          <>
            Wholesale edible cups <i>for your business.</i>
          </>
        }
        intro="Serve something your customers will remember — and photograph. CUP2EAT supplies cafes, restaurants, hotels, caterers and distributors across India."
        image={asset("img/wholesale-page.jpg")}
        alt="A bulk box of CUP2EAT edible cups packed for cafes, restaurants and events"
      />

      <section className="section offer-section">
        <Reveal className="offer-card">
          <div className="offer-card-left">
            <p className="eyebrow">The advertised offer</p>
            <div className="offer-price">
              <span className="offer-currency">₹</span>
              <b>3,999</b>
            </div>
            <p className="offer-sub">
              for <b>{OFFER.quantity} cups</b> · approx. <b>{OFFER.perCup} per cup</b>
            </p>
            <ul className="offer-points dark">
              <li><Check size={15} /> Chocolate · Vanilla · Elaichi — mix flavours freely</li>
              <li><Check size={15} /> {OFFER.delivery}</li>
              <li><Check size={15} /> Final pricing &amp; tax terms confirmed with every order</li>
            </ul>
          </div>
          <div className="offer-card-right">
            <b>Good to know</b>
            <p>
              The ₹3,999 offer is our advertised promotional price for 396 cups. Your quotation
              confirms current pricing, packaging, GST and delivery timelines for your location —
              so there are no surprises later.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section segments">
        <SectionHead
          eyebrow="Who we supply"
          title={
            <>
              Made for memorable <i>service.</i>
            </>
          }
        />
        <div className="segments-grid">
          {SEGMENTS.map(([icon, t, d], i) => (
            <Reveal key={i} delay={i * 80}>
              <article className="why-card">
                <span className="why-icon">{icon}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section enquiry-section" id="enquiry-form">
        <div className="enquiry-grid">
          <Reveal className="enquiry-intro">
            <p className="eyebrow">Bulk enquiry</p>
            <h2>
              Let&rsquo;s grow something <i>delicious.</i>
            </h2>
            <p>
              Tell us about your business and requirements. Our team responds with a personalised
              quotation — flavours, quantities, pricing and delivery details included.
            </p>
            <p className="enquiry-call">
              Prefer to talk? Call{" "}
              <a href="tel:+919818192575">+91 98181 92575</a> — we&rsquo;re happy to help.
            </p>
          </Reveal>

          <Reveal delay={120} className="enquiry-form-wrap">
            {done ? (
              <div className="form-success" role="status">
                <span className="success-icon"><Check size={22} /></span>
                <h3>Enquiry received — thank you!</h3>
                <p>
                  Your reference is <b>{done.ref}</b>. Our team will reach out shortly with your
                  wholesale quotation.
                </p>
                <a className="btn btn-gold" href={done.wa} target="_blank" rel="noreferrer">
                  <WhatsApp size={17} /> Send the same details on WhatsApp
                </a>
                <button type="button" className="arrow-link" onClick={() => setDone(null)}>
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={submit} noValidate>
                <div className="form-two">
                  <label>
                    Full name <em>*</em>
                    <input name="full_name" autoComplete="name" placeholder="Your name" />
                    {errors.full_name && <span className="field-error">{errors.full_name}</span>}
                  </label>
                  <label>
                    Business name <em>*</em>
                    <input name="business_name" autoComplete="organization" placeholder="Cafe, hotel or company" />
                    {errors.business_name && <span className="field-error">{errors.business_name}</span>}
                  </label>
                </div>
                <div className="form-two">
                  <label>
                    Phone number <em>*</em>
                    <input name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </label>
                  <label>
                    Email <em>*</em>
                    <input name="email" type="email" autoComplete="email" placeholder="you@business.com" />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>
                </div>
                <div className="form-two">
                  <label>
                    Business type <em>*</em>
                    <select name="business_type" defaultValue="">
                      <option value="" disabled>Select one</option>
                      {BUSINESS_TYPES.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                    {errors.business_type && <span className="field-error">{errors.business_type}</span>}
                  </label>
                  <label>
                    Required quantity (cups) <em>*</em>
                    <input name="quantity" type="number" min={100} step={1} placeholder="e.g. 396" />
                    {errors.quantity && <span className="field-error">{errors.quantity}</span>}
                  </label>
                </div>

                <fieldset className="flavour-set">
                  <legend>Preferred flavours <em>*</em></legend>
                  <div className="flavour-checks">
                    {["Chocolate", "Vanilla", "Elaichi"].map((f) => (
                      <label key={f} className="check-pill">
                        <input type="checkbox" name="flavours" value={f} />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                  {errors.flavours && <span className="field-error">{errors.flavours}</span>}
                </fieldset>

                <div className="form-two">
                  <label>
                    Delivery city <em>*</em>
                    <input name="city" placeholder="City" />
                    {errors.city && <span className="field-error">{errors.city}</span>}
                  </label>
                  <label>
                    State <em>*</em>
                    <select name="state" defaultValue="">
                      <option value="" disabled>Select state</option>
                      {STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <span className="field-error">{errors.state}</span>}
                  </label>
                </div>
                <label>
                  Additional requirements
                  <textarea
                    name="requirements"
                    rows={4}
                    placeholder="Timeline, packaging preferences, custom branding — anything we should know"
                  />
                </label>

                <button type="submit" className="btn btn-gold btn-full" disabled={sending}>
                  {sending ? "Submitting…" : "Submit enquiry"} <WhatsApp size={17} />
                </button>
                <small className="form-footnote">
                  Submitting shares your details with the CUP2EAT team for quotation purposes
                  only.
                </small>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
