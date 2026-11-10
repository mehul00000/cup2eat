/* CUP2EAT — central content, brand data and helpers. */

/**
 * Resolve a public-asset path against the deploy base URL, so the site works
 * both at a domain root (dev, "/" ) and on GitHub Pages subpaths ("/cup2eat/").
 */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, "");

export const PHONE_DISPLAY = "+91 98181 92575";
export const PHONE_TEL = "tel:+919818192575";
export const WA_NUMBER = "919818192575";

export const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const MSG_GENERAL =
  "Hello CUP2EAT,\n\nI am interested in your edible cups.\n\nPlease share the available flavours, wholesale pricing, quantity details and ordering information.\n\nThank you.";

export const MSG_ORDER =
  "Hello CUP2EAT,\n\nI would like to place an order for your edible cups.\n\nFlavour:\nQuantity:\nDelivery city:\n\nPlease share the order details.\n\nThank you.";

export const productMsg = (name: string) =>
  `Hello CUP2EAT,\n\nI am interested in your ${name} edible cups.\n\nPlease share product specifications, pricing and ordering details.\n\nThank you.`;

/* ---------- Wholesale offer (advertised values) ---------- */

export const OFFER = {
  price: "₹3,999",
  quantity: 396,
  perCup: "₹10.10",
  delivery: "Free delivery across India (as advertised)",
};

/* ---------- Products ---------- */

export type Product = {
  slug: string;
  name: string;
  appearance: string;
  tone: string;
  card: string;
  shop: string;
  gallery: [string, string];
  tagline: string;
  description: string;
  applications: string[];
  pairs: string;
};

export const products: Product[] = [
  {
    slug: "chocolate",
    name: "Chocolate",
    appearance: "Dark brown",
    tone: "#45210a",
    card: asset("img/product-chocolate.jpg"),
    shop: asset("img/shop-chocolate.jpg"),
    gallery: [asset("img/product-chocolate-2.jpg"), asset("img/product-chocolate-3.jpg")],
    tagline: "Rich chocolate-inspired edible cup",
    description:
      "A rich, dark cocoa-toned cup with a dessert-style finish. Made to hold your coffee, hot chocolate or dessert — and then become part of it.",
    applications: ["Coffee", "Hot chocolate", "Desserts", "Ice cream"],
    pairs: "Coffee · Hot chocolate · Desserts · Ice cream",
  },
  {
    slug: "vanilla",
    name: "Vanilla",
    appearance: "Golden beige",
    tone: "#bd7430",
    card: asset("img/product-vanilla.jpg"),
    shop: asset("img/shop-vanilla.jpg"),
    gallery: [asset("img/product-vanilla-2.jpg"), asset("img/product-vanilla-3.jpg")],
    tagline: "Classic vanilla-inspired edible cup",
    description:
      "A golden, classic vanilla-inspired cup. A gentle, familiar flavour that pairs beautifully with tea, coffee and sweet servings.",
    applications: ["Tea", "Coffee", "Desserts", "Ice cream"],
    pairs: "Tea · Coffee · Desserts · Ice cream",
  },
  {
    slug: "elaichi",
    name: "Elaichi",
    appearance: "Greenish golden",
    tone: "#7c8a4a",
    card: asset("img/product-elaichi.jpg"),
    shop: asset("img/shop-elaichi.jpg"),
    gallery: [asset("img/product-elaichi-2.jpg"), asset("img/product-elaichi-3.jpg")],
    tagline: "Cardamom-inspired edible cup",
    description:
      "A greenish-golden cup with a cardamom character, created for Indian chai moments, teas and dessert servings with a distinctly Indian touch.",
    applications: ["Indian chai", "Tea", "Coffee", "Dessert servings"],
    pairs: "Indian chai · Tea · Coffee · Dessert servings",
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug) ?? products[0];

/* ---------- Enquiry storage (client-side, until the backend is connected) ---------- */

export type Enquiry = {
  ref: string;
  kind: "wholesale" | "contact";
  savedAt: string;
  data: Record<string, string>;
};

const ENQ_KEY = "cup2eat_enquiries";

export function saveEnquiry(kind: Enquiry["kind"], data: Record<string, string>): Enquiry {
  const entry: Enquiry = {
    ref: `C2E-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    kind,
    savedAt: new Date().toISOString(),
    data,
  };
  try {
    const list = JSON.parse(localStorage.getItem(ENQ_KEY) ?? "[]") as Enquiry[];
    list.push(entry);
    localStorage.setItem(ENQ_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable — enquiry is still shown to the customer */
  }
  return entry;
}

/* ---------- Form helpers ---------- */

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
export const isPhone = (v: string) => /^[6-9]\d{9}$/.test(v.replace(/[^\d]/g, "").slice(-10));

export const BUSINESS_TYPES = [
  "Cafe",
  "Restaurant",
  "Hotel",
  "Catering",
  "Event Management",
  "Distributor",
  "Retailer",
  "Other",
];

export const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu",
  "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other",
];

/* ---------- FAQ content ---------- */

export const FAQS: [string, string][] = [
  [
    "What exactly is an edible cup?",
    "CUP2EAT is a cup you can eat. You fill it with your favourite beverage or dessert, enjoy it, and then eat the cup itself — a crisp, dessert-style finish instead of a cup in the bin.",
  ],
  [
    "Which flavours are available?",
    "Three signature flavours: Chocolate (dark brown), Vanilla (golden beige) and Elaichi (greenish golden) — a cardamom-inspired cup made for Indian chai.",
  ],
  [
    "What does the wholesale offer include?",
    "The advertised wholesale pack includes 396 edible cups for ₹3,999 — approximately ₹10.10 per cup — with delivery advertised as included across India. Final terms are confirmed with every order.",
  ],
  [
    "How do I place an order?",
    "Directly on WhatsApp at 98181 92575, or through the enquiry forms on this website. Our team confirms flavours, quantity and delivery details with you personally.",
  ],
  [
    "Can cafes, restaurants and hotels order in bulk?",
    "Yes. Wholesale supply for cafes, restaurants, hotels, caterers, event organisers and distributors is our core business. Request a wholesale quote and we will respond with the details.",
  ],
  [
    "What about ingredients, shelf life and storage?",
    "Complete ingredient, allergen and storage information is shared with every quotation and printed on the product packaging, so you always have verified information.",
  ],
  [
    "Do you deliver across India?",
    "The wholesale offer is advertised with delivery included across India. Exact timelines and coverage for your location are confirmed when you order.",
  ],
  [
    "Are the cups suitable for hot beverages?",
    "The cups are designed to hold beverages and desserts for a serving experience. Serving guidance for hot drinks is shared by our team with every enquiry.",
  ],
];
