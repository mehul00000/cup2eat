/* Small inline SVG icon set (stroke = currentColor unless noted). */

type P = { size?: number; className?: string };

const Svg = ({ size = 20, className, children }: P & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const Arrow = (p: P) => (
  <Svg {...p}>
    <path d="M5 12h14m-5-5 5 5-5 5" />
  </Svg>
);

export const Menu = (p: P) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const Close = (p: P) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);

export const Cup = (p: P) => (
  <Svg {...p}>
    <path d="M5 4h14l-1.6 14.5a2 2 0 0 1-2 1.5H8.6a2 2 0 0 1-2-1.5L5 4Z" />
    <path d="M19 6.5h2.5a1.5 1.5 0 0 1 0 3H18" />
  </Svg>
);

export const Leaf = (p: P) => (
  <Svg {...p}>
    <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z" />
    <path d="M4 20c4-4 7-7 10-10" />
  </Svg>
);

export const Spark = (p: P) => (
  <Svg {...p}>
    <path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </Svg>
);

export const Truck = (p: P) => (
  <Svg {...p}>
    <path d="M3 6h11v10H3zM14 9h4l3 3.5V16h-7" />
    <circle cx="7" cy="18.5" r="1.6" />
    <circle cx="17" cy="18.5" r="1.6" />
  </Svg>
);

export const Store = (p: P) => (
  <Svg {...p}>
    <path d="M4 9 5.5 4h13L20 9M4 9c0 1.4 1.1 2.5 2.5 2.5S9 10.4 9 9c0 1.4 1.1 2.5 2.5 2.5S14 10.4 14 9c0 1.4 1.1 2.5 2.5 2.5S20 10.4 20 9M5 11.5V20h14v-8.5M9 20v-5h6v5" />
  </Svg>
);

export const Users = (p: P) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19c.6-3.4 2.7-5 5.5-5s4.9 1.6 5.5 5" />
    <path d="M15.5 5.7a3 3 0 0 1 0 4.6M17.5 14.2c1.6.8 2.7 2.3 3 4.8" />
  </Svg>
);

export const Phone = (p: P) => (
  <Svg {...p}>
    <path d="M5 4h4l1.5 4L8 10a12 12 0 0 0 6 6l2-2.5 4 1.5v4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
  </Svg>
);

export const Pin = (p: P) => (
  <Svg {...p}>
    <path d="M12 21s-7-5.8-7-11a7 7 0 0 1 14 0c0 5.2-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </Svg>
);

export const Check = (p: P) => (
  <Svg {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
);

export const Chevron = (p: P) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

/** WhatsApp brand glyph (filled). */
export const WhatsApp = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.53 3.68 1.46 5.2L2 22l5.1-1.6a9.9 9.9 0 0 0 4.94 1.28c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm0 17.96c-1.62 0-3.12-.48-4.38-1.3l-.3-.2-3.06.96.98-2.98-.2-.32a8.04 8.04 0 0 1-1.24-4.28c0-4.44 3.62-8.06 8.08-8.06 4.44 0 8.06 3.62 8.06 8.06 0 4.46-3.62 8.12-7.94 8.12Zm4.42-5.9c-.24-.12-1.44-.7-1.66-.78-.22-.08-.38-.12-.54.12-.16.24-.62.8-.76.96-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.94-1.2 7.3 7.3 0 0 1-1.34-1.68c-.14-.24-.02-.38.1-.5.12-.12.26-.3.38-.46.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.74-1.8-.2-.48-.4-.4-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.1 3.64.58.24 1.02.38 1.38.5.58.18 1.1.16 1.52.1.46-.08 1.44-.6 1.64-1.16.2-.58.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);
