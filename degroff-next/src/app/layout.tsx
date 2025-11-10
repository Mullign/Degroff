import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const DEPLOY_URL = "https://mullign.github.io/Degroff";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(DEPLOY_URL),
  title: "PitotShield V2™ SmartCover™ (PSV2) | DeGroff Aviation Technologies",
  description:
    "Discover the PitotShield V2™ SmartCover™ (PSV2) — the auto-releasing pitot tube cover engineered to stop Covered Pitot Events (COPEs) and protect mission-critical operations.",
  icons: {
    icon: `${basePath || ""}/favicon.ico`,
  },
  openGraph: {
    title: "PitotShield V2™ SmartCover™ (PSV2)",
    description:
      "Heat-activated, auto-releasing pitot tube cover engineered to eliminate COPEs and protect aircraft operations.",
    url: DEPLOY_URL,
    siteName: "DeGroff Aviation Technologies",
    images: [
      {
        url: "/assets/hero-main.jpg",
        width: 1600,
        height: 840,
        alt: "PitotShield V2™ SmartCover™ (PSV2) product hero",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PitotShield V2™ SmartCover™ (PSV2)",
    description:
      "Heat-activated, auto-releasing pitot tube cover engineered to eliminate COPEs and protect aircraft operations.",
    images: ["/assets/hero-main.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} page-shell`}>
        {children}
      </body>
    </html>
  );
}
