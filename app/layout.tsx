import type { Metadata, Viewport } from "next";
import { Unbounded, Golos_Text, Manrope } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

const lede = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-lede",
  display: "swap",
  weight: ["600", "700", "800"],
});

const sans = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Кварта — свежая обжарка кофе в Минске",
    template: "%s · Кварта",
  },
  description:
    "Ремесленная обжарка «Кварта» в Минске. Партии по 5 кг с 2019 года. Жарка по четвергам, доставка по пятницам — зерно на 1–3 день после обжарки.",
  keywords: [
    "кофе Минск",
    "обжарка кофе",
    "свежий кофе",
    "подписка на кофе",
    "Кварта",
  ],
  authors: [{ name: "Кварта" }],
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: siteUrl,
    siteName: "Кварта",
    title: "Кварта — свежая обжарка кофе в Минске",
    description:
      "Обжариваем по четвергам, развозим по пятницам. Зерно приходит на 1–3 день после обжарки.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Кварта — ремесленная обжарка кофе",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Кварта — свежая обжарка кофе в Минске",
    description:
      "Микро-партии по 5 кг. Четверг — обжарка, пятница — доставка.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${display.variable} ${lede.variable} ${sans.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try { if (localStorage.getItem("kvarta-theme") === "dark") document.documentElement.dataset.theme = "dark"; } catch {}',
          }}
        />
      </head>
      <body className="bg-noir font-sans text-foam antialiased">{children}</body>
    </html>
  );
}
