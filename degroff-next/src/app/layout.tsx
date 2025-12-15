import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteBackground } from "@/components/SiteBackground";
import { ThemeProvider } from "@/components/ThemeProvider";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pitotshields.com";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;
const absoluteUrl = (path: string) => {
  const relative = withBasePath(path);
  return new URL(relative, SITE_URL).toString();
};
const metadataBase = (() => {
  try {
    return new URL(SITE_URL);
  } catch (error) {
    console.warn("Invalid NEXT_PUBLIC_SITE_URL, falling back to default metadataBase.");
    return new URL("https://pitotshields.com");
  }
})();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase,
  title: "PitotShield V2™ SmartCover™ (PSV2) | DeGroff Aviation Technologies™",
  description:
    "Discover the PitotShield V2™ SmartCover™ (PSV2) — the auto-releasing pitot tube cover engineered to stop Covered Pitot Events (COPEs) and protect mission-critical operations.",
  icons: {
    icon: withBasePath("/favicon.ico"),
  },
  openGraph: {
    title: "PitotShield V2™ SmartCover™ (PSV2)",
    description:
      "Heat-activated, auto-releasing pitot tube cover engineered to eliminate COPEs and protect aircraft operations.",
    url: SITE_URL,
    siteName: "DeGroff Aviation Technologies™",
    images: [
      {
        url: absoluteUrl("/assets/hero-main.jpg"),
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
    images: [absoluteUrl("/assets/hero-main.jpg")],
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
        <ThemeProvider>
          <SiteBackground>{children}</SiteBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
