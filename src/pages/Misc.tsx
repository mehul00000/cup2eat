import { FormEvent, useState } from "react";
import { FAQS, MSG_GENERAL, isEmail, isPhone, saveEnquiry, waLink, asset } from "../data";
import { Arrow, Check, Cup, Leaf, Phone, Spark, Store, Users, WhatsApp } from "../icons";
import { Go, PageHero, Reveal, SectionHead } from "../chrome";

/* ================= Applications ================= */

const APPS = [
  ["Coffee", "app-coffee.jpg", "The espresso ritual, upgraded. Serve filter coffee, lattes and cappuccinos in a chocolate or vanilla edible cup — the last sip ends with a crunch, not an empty cup on the table."],
  ["Tea & Chai", "app-chai.jpg", "The elaichi cup was made for Indian chai. Cardamom in the cup, cardamom in the chai — a pairing your guests will not find anywhere else."],
  ["Ice Cream", "app-icecream.jpg", "Sundaes, kulfi and dessert shots served in a chilled edible cup that holds its shape — and quietly becomes the best part of the dessert."],
  ["Desserts", "app-desserts.jpg", "Mousse, shrikhand, cheesecake shots and festival sweets — plating that disappears, so there is nothing to wash and nothing to throw."],
  ["Cafés & Restaurants", "app-cafe.jpg", "A signature serving experience that customers photograph and share. Edible cups turn an ordinary order into a story about your brand."],
  ["Events & Catering", "app-events.jpg", "Weddings, corporate launches, catering counters — a talking point built into the serve, with less single-use waste left behind."],
] as const;

export function ApplicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Applications"
        title={
          <>
            One cup, endless <i>moments.</i>
          </>
        }
        intro="From the first morning chai to the last dessert at a wedding — CUP2EAT fits every serving occasion."
      />
      <section className="section app-list">
        {APPS.map(([title, img, text], i) => (
          <Reveal key={title}>
            <article className={`shop-row ${i % 2 ? "flip" : ""}`}>
              <div className="shop-media static">
                <img src={asset(`img/${img}`)} alt={`${title} served in CUP2EAT edible cups`} loading="lazy" />
              </div>
              <div className="shop-copy">
                <p className="eyebrow">0{i + 1}</p>
                <h2>
                  {title.split(" ")[0]} <i>{title.split(" ").slice(1).join(" ") || "& more"}</i>
                </h2>
                <p>{text}</p>
                <a className="btn btn-outline-ink" href={waLink(MSG_GENERAL)} target="_blank" rel="noreferrer">
                  <WhatsApp size={16} /> Discuss your use case
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}

/* ================= About ================= */

export function AboutPage({ go }: { go: Go }) {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            We believe the best things are <i>worth eating.</i>
          </>
        }
        intro="CUP2EAT turns the end of your drink into the beginning of something delicious."
      />

      <section className="b2b-band">
        <Reveal className="b2b-media">
          <img src={asset("img/about-story.jpg")} alt="Plated dessert service — the craft behind CUP2EAT" loading="lazy" />
        </Reveal>
        <Reveal delay={120} className="b2b-copy">
          <p className="eyebrow">The original idea</p>
          <h2>
            One simple question. <i>One delicious answer.</i>
          </h2>
          <p>
            Why should the experience end with the last sip? We imagined a cup that could become
            the dessert — crisp, satisfying and available in flavours made for every mood.
          </p>
          <p>
            CUP2EAT was created to bring that idea to tables across India: a premium edible cup
            that makes every coffee break, chai moment and dessert counter feel more memorable.
          </p>
        </Reveal>
      </section>

      <section className="section values">
        <SectionHead
          light
          eyebrow="What drives us"
          title={
            <>
              Less waste. More <i>taste.</i>
            </>
          }
        />
        <div className="why-grid">
          {[
            [<Spark size={24} key="1" />, "Product innovation", "A dessert-grade cup engineered to hold beverages and desserts, then be eaten — turning disposables into delight."],
            [<Leaf size={24} key="2" />, "Sustainability direction", "Every edible cup is a single-use cup that never becomes waste. We are committed to strengthening our eco-credentials with proper certifications as we grow."],
            [<Users size={24} key="3" />, "Wholesale vision", "We are building the most trusted edible-cup supply partner for India's cafes, hotels, caterers and distributors."],
          ].map(([icon, t, d], i) => (
            <Reveal key={i} delay={i * 90}>
              <article className="why-card">
                <span className="why-icon">{icon}</span>
                <h3>{t as string}</h3>
                <p>{d as string}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="b2b-band flip">
        <Reveal className="b2b-media">
          <img src={asset("img/about-craft.jpg")} alt="Warm hospitality setting — CUP2EAT's philosophy" loading="lazy" />
        </Reveal>
        <Reveal delay={120} className="b2b-copy">
          <p className="eyebrow">Our philosophy</p>
          <h2>
            Premium, honest, <i>delicious.</i>
          </h2>
          <p>
            We keep our product claims simple and verified, share full product information with
            every quotation, and put the same care into a single retail pack as a 396-cup
            wholesale order.
          </p>
          <button type="button" className="btn btn-gold" onClick={() => go("contact")}>
            Talk to our team <Arrow size={17} />
          </button>
        </Reveal>
      </section>
    </>
  );
}

/* ================= Contact ================= */

export function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ ref: string; wa: string } | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const data = Object.fromEntries(new FormData(f).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Please enter your name.";
    if (!isPhone(data.phone ?? "")) errs.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!isEmail(data.email ?? "")) errs.email = "Enter a valid email address.";
    if (!data.subject?.trim()) errs.subject = "Please add a subject.";
    if (!data.message?.trim()) errs.message = "Please write your message.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const entry = saveEnquiry("contact", data);
    setDone({
      ref: entry.ref,
      wa: waLink(
        `Hello CUP2EAT,\n\nContact form message (${entry.ref}):\n\nName: ${data.name}\nPhone: ${data.phone}\nSubject: ${data.subject}\n\n${data.message}\n\nThank you.`,
      ),
    });
    f.reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            We&rsquo;d love to <i>hear from you.</i>
          </>
        }
        intro="Questions, order support or a business enquiry — the CUP2EAT team is one call or message away."
        image={asset("img/contact.jpg")}
        alt="Coffee and conversation — reach the CUP2EAT team"
      />

      <section className="section contact-section">
        <div className="enquiry-grid">
          <Reveal className="contact-cards">
            <a className="contact-card" href="tel:+919818192575">
              <span className="why-icon"><Phone size={22} /></span>
              <div>
                <b>Call us</b>
                <p>+91 98181 92575</p>
                <small>Click to call — fastest for orders</small>
              </div>
            </a>
            <a className="contact-card" href={waLink(MSG_GENERAL)} target="_blank" rel="noreferrer">
              <span className="why-icon wa"><WhatsApp size={22} /></span>
              <div>
                <b>WhatsApp</b>
                <p>+91 98181 92575</p>
                <small>Share your requirement in one message</small>
              </div>
            </a>
            <div className="contact-card">
              <span className="why-icon"><Store size={22} /></span>
              <div>
                <b>Business enquiries</b>
                <p>Wholesale &amp; distribution</p>
                <small>Use the form — we respond personally</small>
              </div>
            </div>
            <div className="contact-card">
              <span className="why-icon"><Cup size={22} /></span>
              <div>
                <b>Looking for cups?</b>
                <p>Wholesale pack: 396 cups · ₹3,999</p>
                <small>Advertised offer — terms confirmed at order</small>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="enquiry-form-wrap">
            {done ? (
              <div className="form-success" role="status">
                <span className="success-icon"><Check size={22} /></span>
                <h3>Message sent — thank you!</h3>
                <p>
                  Your reference is <b>{done.ref}</b>. We&rsquo;ll get back to you shortly.
                </p>
                <a className="btn btn-gold" href={done.wa} target="_blank" rel="noreferrer">
                  <WhatsApp size={17} /> Continue on WhatsApp
                </a>
                <button type="button" className="arrow-link" onClick={() => setDone(null)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={submit} noValidate>
                <div className="form-two">
                  <label>
                    Name <em>*</em>
                    <input name="name" autoComplete="name" placeholder="Your name" />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </label>
                  <label>
                    Phone <em>*</em>
                    <input name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </label>
                </div>
                <div className="form-two">
                  <label>
                    Email <em>*</em>
                    <input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>
                  <label>
                    Subject <em>*</em>
                    <input name="subject" placeholder="What is it about?" />
                    {errors.subject && <span className="field-error">{errors.subject}</span>}
                  </label>
                </div>
                <label>
                  Message <em>*</em>
                  <textarea name="message" rows={5} placeholder="Tell us how we can help" />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </label>
                <button type="submit" className="btn btn-gold btn-full">
                  Send message <WhatsApp size={17} />
                </button>
                <small className="form-footnote">
                  Your details are used only to respond to this enquiry.
                </small>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ================= FAQ ================= */

export function FaqPage({ go }: { go: Go }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Everything you <i>want to know.</i>
          </>
        }
        intro="The questions our customers ask most — still curious? Our team is always happy to help."
      />
      <section className="section faq-section">
        <div className="faq-wrap wide">
          {FAQS.map(([q, a], i) => (
            <Reveal key={q} delay={i * 40}>
              <div className={`faq-item ${open === i ? "open" : ""}`}>
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  <span>{q}</span>
                  <b aria-hidden="true">{open === i ? "−" : "+"}</b>
                </button>
                {open === i && <p>{a}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="center-cta">
          <button type="button" className="btn btn-gold" onClick={() => go("contact")}>
            Ask us directly <Arrow size={16} />
          </button>
        </Reveal>
      </section>
    </>
  );
}

/* ================= Policies ================= */

const POLICIES = {
  privacy: {
    eyebrow: "Legal",
    title: <>Privacy <i>policy.</i></>,
    intro: "How CUP2EAT collects, uses and protects your information.",
    sections: [
      ["Information we collect", "When you submit an enquiry or contact form, we collect the details you provide: your name, phone number, email, business information and requirements. We do not collect payment information — orders are confirmed personally by our team."],
      ["How we use it", "Your information is used only to respond to your enquiry, prepare quotations and complete your order. We never sell or rent customer data to third parties."],
      ["WhatsApp & calls", "When you contact us on WhatsApp or by phone, standard platform privacy terms apply in addition to this policy. Message content is used to serve your enquiry."],
      ["Storage & retention", "Enquiry records are kept only as long as needed to serve your requirement and comply with applicable law. You may ask us to delete your enquiry records at any time."],
      ["Your choices", "Write to us via the contact page to access, correct or delete the information you have shared with us."],
    ] as [string, string][],
  },
  terms: {
    eyebrow: "Legal",
    title: <>Terms &amp; <i>conditions.</i></>,
    intro: "The ground rules for using this website and ordering from CUP2EAT.",
    sections: [
      ["About our service", "This website showcases CUP2EAT edible cups and accepts enquiries for retail and wholesale purchases. Orders are confirmed by our team over WhatsApp or phone before payment or dispatch."],
      ["Pricing", "Prices displayed, including the advertised wholesale offer of ₹3,999 for 396 cups, are promotional and may change. Applicable taxes, packaging and delivery terms are confirmed in your official quotation."],
      ["Product information", "Ingredient, allergen and storage details are provided with each quotation and on product packaging. Product images are illustrative; the finished cup may vary slightly in appearance."],
      ["Intellectual property", "The CUP2EAT name, logo and website content belong to CUP2EAT and may not be copied or reused commercially without written permission."],
      ["Acceptable use", "This website may not be used to submit false, abusive or automated enquiries. We reserve the right to decline service where enquiries appear fraudulent."],
    ] as [string, string][],
  },
  shipping: {
    eyebrow: "Legal",
    title: <>Shipping &amp; <i>delivery.</i></>,
    intro: "How your edible cups reach you, anywhere in India.",
    sections: [
      ["Coverage", "We advertise delivery across India. Coverage and timelines for your specific pincode are confirmed when your order is placed."],
      ["Charges", "The advertised wholesale offer includes delivery as advertised. Any applicable delivery charges for other order types are confirmed before you pay."],
      ["Timelines", "Dispatch timelines depend on order size and destination, and are shared with your order confirmation. Perishable food products are packed to protect quality in transit."],
      ["Receiving your order", "Please inspect the package on arrival and report any issue to our team immediately so we can make it right."],
    ] as [string, string][],
  },
  refunds: {
    eyebrow: "Legal",
    title: <>Refund &amp; <i>cancellation.</i></>,
    intro: "Fair, simple resolution if something goes wrong.",
    sections: [
      ["Cancellations", "Because every order is confirmed personally, cancellation is simple: contact us before dispatch and we will cancel or adjust your order."],
      ["Damaged or incorrect products", "If your order arrives damaged or differs from what was confirmed, contact us immediately with photographs. We will arrange a replacement or refund of the affected items after verification."],
      ["Quality concerns", "Product quality is our priority. If you are not satisfied with the condition of your cups on arrival, reach out — our team will work with you on a fair resolution."],
      ["How refunds are processed", "Approved refunds are returned to the original payment method used for your order. Timelines depend on the payment channel and are confirmed at the time of approval."],
    ] as [string, string][],
  },
} as const;

export function PolicyPage({ which }: { which: keyof typeof POLICIES }) {
  const doc = POLICIES[which];
  return (
    <>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} intro={doc.intro} />
      <section className="section policy">
        {doc.sections.map(([h, t]) => (
          <Reveal key={h}>
            <article className="policy-block">
              <h2>{h}</h2>
              <p>{t}</p>
            </article>
          </Reveal>
        ))}
        <Reveal>
          <p className="policy-note">
            Questions about this policy? <a href="tel:+919818192575">Call +91 98181 92575</a> or
            message us on WhatsApp — we&rsquo;ll clarify.
          </p>
        </Reveal>
      </section>
    </>
  );
}
