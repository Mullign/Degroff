'use client';

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { NewsletterForm } from "@/components/NewsletterForm";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const stats = [
  { value: "40+", label: "Years advancing aviation safety" },
  { value: "90%+", label: "Pitot probe configurations covered" },
  { value: "24/7", label: "Support through DeGroff aviation and partners worldwide" },
  { value: "Global", label: "Trusted by commercial, defense, and executive fleets" },
];

const highlights = [
  {
    title: "Auto-release when heat activates",
    description:
      "PSV2™ disengages itself within 2–5 minutes of pitot heat activation, eliminating human error during dispatch.",
  },
  {
    title: "Heat & solvent proof construction",
    description:
      "No fabric to fray. High-temp silicone and PTFE interfaces withstand repeated heat cycles, avgas, and jet fuel exposure.",
  },
  {
    title: "Universal fleet coverage",
    description:
      "Standard (V2), Short (V2-S), and Large (V2-L) models safeguard Airbus, Boeing, Gulfstream, Embraer, Cessna, and more.",
  },
];

const featureCards = [
  {
    title: "Total Pitot Protection",
    copy: "Comprehensive tip-to-sleeve protection engineered to keep sensitive pitot probes contaminant-free during maintenance.",
  },
  {
    title: "Human Error Mitigation",
    copy: "Self-releasing design prevents forgotten covers, eliminating a top cause of covered pitot events (COPEs).",
  },
  {
    title: "Heat-Resistant Materials",
    copy: "Developed to activate with pitot heat, using hi-temp silicone contact points and PTFE shielding for long service life.",
  },
  {
    title: "FOD-Free, Fabric-Free",
    copy: "One-piece polypropylene body with no fabric to unravel, reducing FOD risk across flight lines, hangars, and ramps.",
  },
  {
    title: "Rapid Installation",
    copy: "Simplified fit-and-release operation streamlines turnarounds for maintenance teams and crew members.",
  },
  {
    title: "Solvent & Fuel Resistant",
    copy: "Purpose-built for ramp operations with chemical resistance to avgas, jet fuel, and common cleaning solvents.",
  },
];

type CompatibilityItem = {
  name: string;
  logo?: string;
  width?: number;
  height?: number;
};

const compatibility: CompatibilityItem[] = [
  { name: "Airbus", logo: asset("/assets/AIRBUS_Blue.png"), width: 180, height: 60 },
  { name: "Boeing", logo: asset("/assets/Logo-Boeing.png"), width: 200, height: 60 },
  { name: "Bombardier", logo: asset("/assets/Bombardier-Logo.jpg"), width: 200, height: 60 },
  { name: "Cessna", logo: asset("/assets/cessna.webp"), width: 160, height: 60 },
  { name: "Embraer", logo: asset("/assets/embraer.svg"), width: 200, height: 60 },
  { name: "HondaJet", logo: asset("/assets/HondaJet_Large_Black2011_Logo.jpg"), width: 160, height: 60 },
  { name: "Gulfstream", logo: asset("/assets/Gulfstream_Aerospace_logo.svg.png"), width: 200, height: 60 },
  { name: "Learjet", logo: asset("/assets/Bombardier-Learjet.svg.png"), width: 200, height: 60 },
  { name: "Defense Operators" },
  { name: "And More" },
];

const timeline = [
  {
    phase: "Assess & Plan",
    details:
      "Review pitot probe configurations, ramp procedures, and COPEs history with DeGroff aviation specialists.",
  },
  {
    phase: "Deploy & Train",
    details:
      "Deliver PSV2™ kits, briefing cards, and RBF streamer selection. Train maintenance and flight crews in minutes.",
  },
  {
    phase: "Verify & Monitor",
    details:
      "Confirm auto-release activation, document compliance, and monitor COPEs reduction metrics across your fleet.",
  },
];

const galleryImages = [
  { src: asset("/assets/1.jpg"), alt: "PitotShield V2™ SmartCover™ product image 1" },
  { src: asset("/assets/2.jpeg"), alt: "PitotShield V2™ SmartCover™ product image 2" },
  { src: asset("/assets/3.jpg"), alt: "PitotShield V2™ SmartCover™ product image 3" },
  { src: asset("/assets/4.jpg"), alt: "PitotShield V2™ SmartCover™ product image 4" },
  { src: asset("/assets/5.jpg"), alt: "PitotShield V2™ SmartCover™ product image 5" },
  { src: asset("/assets/6.jpg"), alt: "PitotShield V2™ SmartCover™ product image 6" },
  { src: asset("/assets/7.jpeg"), alt: "PitotShield V2™ SmartCover™ product image 7" },
];

const productShowcase = [
  { src: asset("/assets/psv2-aircraft-hanger.jpg"), alt: "PitotShield V2™ SmartCover™ (PSV2) installed on aircraft in hangar" },
  { src: asset("/assets/psv2-aircraft-phenom.jpg"), alt: "PitotShield V2™ SmartCover™ (PSV2) on Embraer Phenom aircraft" },
  { src: asset("/assets/psv2-kit.jpg"), alt: "PitotShield V2™ SmartCover™ (PSV2) kit and components" },
  { src: asset("/assets/psv2-packaging.jpg"), alt: "PitotShield V2™ SmartCover™ (PSV2) packaging and storage" },
  { src: asset("/assets/psv2-streamer-vertical.jpg"), alt: "PitotShield V2™ SmartCover™ (PSV2) Remove Before Flight streamer" },
  { src: asset("/assets/psv2-ends-comparison.jpg"), alt: "PitotShield V2™ SmartCover™ (PSV2) end comparison view" },
];

const technicalSpecs = [
  { label: "Body & Contact Materials", value: "Polypropylene body with hi-temp silicone contact, PTFE tip shield" },
  { label: "Activation", value: "Heat-activated auto-release after pitot heat engagement (2–5 minutes)" },
  { label: "Sizes", value: "Standard (V2), Short (V2-S), Large (V2-L)" },
  { label: "Streamer Options", value: "NAS Red (24 in) or High-Visibility Orange with reflective accent" },
  { label: "Security", value: "Precision fit with isolation barriers, eyelets for RBF and optional lanyards" },
  { label: "Compliance", value: "Designed around FAA and IATA safety practices; ramp and shop friendly" },
];

const procurementSupport = [
  "Regional stocking and rapid fulfillment",
  "Fleet-wide rollout planning and forecasting",
  "Technical data sheets and implementation SOPs",
  "Training assets for maintenance and flight departments",
];

const partnerLogos = [{ src: asset("/assets/logo-proponent.svg"), alt: "Proponent" }];

const distributorGroups = [
  {
    category: "General Aviation",
    segments: [
      { title: "U.S. Distributors", items: ["AeroPhoenix", "Jem Aero", "Aircraft Spruce", "Proponent"] },
      {
        title: "U.S. Linked Dealers",
        items: ["Aircraft Spruce", "SkyGeek.com", "Cirrus Connection", "Wag Aero", "Chief Aircraft", "Sporty’s Pilot Shop"],
      },
      {
        title: "International Dealers",
        items: [
          "Friebe Aero Luftfahrt Bedarf (Germany)",
          "Transair UK Pilot Shop (United Kingdom)",
          "Pooley’s Flight Equipment Ltd. (United Kingdom)",
          "BuckerBook.com (Spain)",
          "Flightstore (Australia)",
        ],
      },
    ],
  },
  {
    category: "Commercial & Bizjet",
    segments: [
      { title: "U.S. Distributors", items: ["Proponent"] },
      { title: "International Distributors", items: ["Proponent"] },
    ],
  },
];

type DocumentSheet = {
  title: string;
  description: string;
  src: string;
  preview: string;
  type: "image" | "pdf";
};

const documentSheets: DocumentSheet[] = [
  {
    title: "PitotShield V2™ Item List Price (Feb. 2025)",
    description: "Standard, Short, and Large Fit pricing plus executive fly-away packages.",
    src: asset("/assets/page-1.jpeg"),
    preview: asset("/assets/page-1.jpeg"),
    type: "image",
  },
  {
    title: "PitotShield V2™ Accessories & Service Components",
    description: "Accessory, service component, and retail packaging catalog with list pricing.",
    src: asset("/assets/page-2.jpeg"),
    preview: asset("/assets/page-2.jpeg"),
    type: "image",
  },
  {
    title: "PitotShield V2™ Document Library",
    description: "Download spec sheets, catalogs, and instruction manuals from DeGroff.",
    src: asset("/assets/page-3.jpeg"),
    preview: asset("/assets/page-3.jpeg"),
    type: "image",
  },
  {
    title: "PitotShield V2™ Operations Manual",
    description: "Comprehensive PSV2™ SmartCover™ manual for maintenance and training personnel.",
    src: asset("/docs/pitotshield-v2-manual.pdf"),
    preview: asset("/assets/psv2-intro-sheet.jpg"),
    type: "pdf",
  },
  {
    title: "PitotShield V2™ Safety & Compliance",
    description: "Regulatory compliance guidance, safety data, and operational standards for PSV2™.",
    src: asset("/docs/pitotshield-v2-safety-compliance.pdf"),
    preview: asset("/assets/psv2-structural-overview.jpg"),
    type: "pdf",
  },
  {
    title: "PitotShield V2™ Technical Spec Sheet",
    description: "Detailed specifications, materials, activation timing, and dimensional callouts.",
    src: asset("/docs/pitotshield-v2-spec-sheet.pdf"),
    preview: asset("/assets/psv2-spec-sheet.jpg"),
    type: "pdf",
  },
  {
    title: "PitotShield V2™ Installation Guide",
    description: "Step-by-step PSV2™ installation instructions with visual references.",
    src: asset("/docs/pitotshield-v2-installation-guide.pdf"),
    preview: asset("/assets/pitotshield-v2-installation-guide.jpg"),
    type: "pdf",
  },
];

const technicalDocuments = documentSheets.filter((doc) => doc.type === "pdf");

const SectionHeader = ({ badge, title, lead }: { badge: string; title: string; lead: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    className="mx-auto mb-12 max-w-4xl text-center"
  >
    <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
      {badge}
    </span>
    <h2 className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">{title}</h2>
    <p className="mt-4 text-base leading-relaxed text-brand-dark/70">{lead}</p>
  </motion.div>
);

const ContactDetails = () => (
  <div id="contact" className="rounded-3xl border border-brand/10 bg-white p-10 shadow-soft">
    <h3 className="text-2xl font-semibold text-brand-dark">DeGroff Aviation Technologies</h3>
    <p className="mt-4 text-brand-dark/70">
      DeGroff Aviation Technologies, LLC
      <br />
      150 Forest Park Dr.
      <br />
      Berne, IN 46711
    </p>
    <p className="mt-4">
      <a href="mailto:info@degroffaviation.com" className="font-semibold text-brand hover:text-brand-dark">
        info@degroffaviation.com
      </a>
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-dark"
        href="mailto:info@degroffaviation.com"
      >
        Contact DeGroff Aviation
      </a>
      <a
        className="inline-flex items-center justify-center rounded-full border border-brand/20 px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:text-brand-dark"
        href="https://www.linkedin.com/company/degroff-aviation-technology/posts/?feedView=all"
        target="_blank"
        rel="noreferrer"
      >
        Follow on LinkedIn
      </a>
      <a
        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:text-brand-dark"
        href="https://www.facebook.com/profile.php?id=61583542143823"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={asset("/assets/facebook.svg")} alt="" width={16} height={16} />
        Follow on Facebook
      </a>
    </div>
  </div>
);

export default function Home() {
  const year = new Date().getFullYear();
  const timelineItems = useMemo(() => timeline, []);
  const [activeDocumentIndex, setActiveDocumentIndex] = useState<number | null>(null);
  const activeDocument = activeDocumentIndex !== null ? documentSheets[activeDocumentIndex] : null;

  const handleDocumentClose = () => setActiveDocumentIndex(null);

  return (
    <>
      <SiteHeader />
      <main className="bg-brand-soft text-brand-dark">
        {/* Hero */}
        <section id="hero" className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand/20 blur-3xl animate-gradient" />
          <div className="pointer-events-none absolute right-[-120px] bottom-0 h-80 w-80 rounded-full bg-brand-dark/10 blur-3xl animate-gradient" />
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
            <div>
              <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                Stop Covered Pitot Events (COPEs)
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-6 text-4xl font-semibold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl"
              >
                PitotShield V2™ SmartCover™ (PSV2)
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-dark/70"
              >
                Heat-activated, auto-releasing pitot tube cover engineered to eliminate COPEs, protect mission-critical probes, and
                keep crews focused on the mission — not on forgotten covers.
              </motion.p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-dark"
                  href="#technology"
                >
                  Explore the Technology
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-brand/20 px-6 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:text-brand-dark"
                  href="#gallery"
                >
                  View PSV2™ in Action
                </a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative hidden aspect-square rounded-[32px] border border-brand/10 bg-brand-soft/60 shadow-soft lg:block"
            >
              <Image
                src={asset("/assets/psv2-kit.jpg")}
                alt="PitotShield V2™ SmartCover™ (PSV2) kit and components"
                fill
                className="rounded-[32px] object-cover"
              />
            </motion.div>
          </div>
          <div className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-2xl border border-brand/10 bg-brand-soft px-6 py-6 text-left shadow-soft"
              >
                {stat.value && <span className="text-3xl font-semibold text-brand-dark">{stat.value}</span>}
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-5 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-3xl border border-brand/10 bg-white p-10 shadow-soft lg:col-span-3"
            >
              <h2 className="text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
                About DeGroff Aviation Technologies
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-dark/70">
                Since 1985, DeGroff Aviation Technologies has pioneered self-disengaging pitot probe covers. PitotShield V2™
                SmartCover™ (PSV2) protects fleets around the world, reducing rejected takeoff incidents, preventing fouled probes, and
                preserving operational tempo across commercial, business, and defense aviation.
              </p>
              <div className="mt-8 grid gap-6">
                {highlights.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-lg font-semibold text-brand-dark">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-dark/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="flex flex-col gap-6 rounded-3xl border border-brand/10 bg-white p-6 shadow-soft lg:col-span-2">
              <div className="relative w-full overflow-hidden rounded-2xl border border-brand/10">
                <video className="w-full" controls preload="metadata" poster={asset("/assets/hero-main.jpg")}>
                  <source src={asset("/assets/psv2-demo.mp4")} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-brand-dark">PSV2™ Auto-Release Demonstration</p>
                <p className="text-brand-dark/70">Heat-activated, COPE-preventing innovation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              badge="Technology"
              title="Engineered to self-disengage. Built to endure."
              lead="PitotShield V2™ SmartCover™ (PSV2) combines precision fit with advanced materials to guard the world's most demanding fleets against COPEs and fouled probes."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="rounded-2xl border border-brand/10 bg-white p-6 shadow-soft"
                >
                  <h3 className="text-lg font-semibold text-brand-dark">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/70">{feature.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Operations */}
        <section id="benefits" className="py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              badge="Operations Advantage"
              title="Stop Covered Pitot Events (COPEs) before they disrupt missions."
              lead="PSV2™ delivers mission-ready assurance for commercial airlines, defense programs, and executive fleets. Prevent costly maintenance delays, safeguard critical instrumentation, and keep crews on schedule."
            />
            <div className="grid gap-10 lg:grid-cols-5">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-3xl border border-brand/10 bg-white p-8 shadow-soft lg:col-span-3"
              >
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark">Why teams choose PSV2™</h3>
                  <ul className="mt-4 space-y-3 text-sm text-brand-dark/70">
                    <li className="flex gap-2">
                      <span className="text-brand">•</span>Eliminates an entire COPE failure mode in under five minutes.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand">•</span>Reduces RTO risk from forgotten or fused pitot covers.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand">•</span>Preserves accurate airspeed data for safer departures.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand">•</span>Speeds up maintenance turnarounds with simplified handling.
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-brand-dark">Ideal for</h3>
                  <ul className="mt-4 space-y-3 text-sm text-brand-dark/70">
                    <li className="flex gap-2">
                      <span className="text-brand">•</span>Commercial airline maintenance and flight ops teams
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand">•</span>Executive and defense aviation programs
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand">•</span>MRO facilities implementing COPE prevention plans
                    </li>
                  </ul>
                </div>
              </motion.div>
              <div className="space-y-4 lg:col-span-2">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
                    className="relative rounded-2xl border border-brand/10 bg-white p-6 shadow-soft"
                  >
                    <span className="absolute top-6 left-6 h-3 w-3 rounded-full bg-brand shadow-[0_0_0_6px_rgba(42,127,255,0.12)]" />
                    <div className="pl-8">
                      <p className="font-semibold text-brand-dark">{item.phase}</p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-dark/70">{item.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features & Compatibility */}
        <section id="compatibility" className="py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-3xl border border-brand/10 bg-white p-10 shadow-soft"
              >
                <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Product Features
                </span>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
                  Purpose-built features for today&apos;s flight lines
                </h2>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {featureCards.slice(0, 3).map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
                      className="space-y-2 text-sm leading-relaxed text-brand-dark/70"
                    >
                      <h3 className="text-lg font-semibold text-brand-dark">{feature.title}</h3>
                      <p>{feature.copy}</p>
                    </motion.div>
                  ))}
                  {featureCards.slice(3).map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
                      className="space-y-2 text-sm leading-relaxed text-brand-dark/70"
                    >
                      <h3 className="text-lg font-semibold text-brand-dark">{feature.title}</h3>
                      <p>{feature.copy}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
                className="rounded-3xl border border-brand/10 bg-white p-10 shadow-soft"
              >
                <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Fleet Compatibility
                </span>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark">
                  Certified coverage across leading aircraft
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-dark/70">
                  PSV2™ supports a wide spectrum of pitot probe configurations across fixed-wing fleets. Custom kits are available for
                  specialized programs.
                </p>
                <ul className="mt-6 grid gap-2 text-sm font-medium text-brand-dark">
                  {compatibility.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.03 }}
                      className="rounded-xl border border-brand/10 px-4 py-3 text-center"
                    >
                      {item.name}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Compatibility marquee */}
        <section aria-label="Fleet coverage marquee" className="bg-brand/5 py-4">
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap text-xs font-semibold uppercase tracking-[0.32em] text-brand-dark/60">
              {compatibility.concat(compatibility).map((item, index) => {
                const key = `${item.name}-${index}`;
                return (
                  <span key={key} className="mx-8 inline-flex items-center gap-4">
                    {item.logo ? (
                      <span className="flex items-center gap-3">
                        <span className="flex items-center">
                          <img
                            src={item.logo}
                            alt={`${item.name} logo`}
                            width={item.width ?? 160}
                            height={item.height ?? 60}
                            className="h-8 w-auto object-contain"
                            loading="lazy"
                          />
                        </span>
                        <span>{item.name}</span>
                      </span>
                    ) : (
                      item.name
                    )}
                    <span className="text-brand/30">•</span>
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section id="product" className="py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              badge="Product Showcase"
              title="PitotShield V2™ SmartCover™ (PSV2) in the field"
              lead="Scroll through mission-ready imagery from OEM partners, hangars, and live flight operations."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productShowcase.map((item, index) => (
                <motion.figure
                  key={item.src}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
                  className="overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-soft"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image src={item.src} alt={item.alt} fill className="object-cover transition duration-300 hover:scale-105" />
                  </div>
                  <figcaption className="px-4 py-3 text-sm text-brand-dark/70">{item.alt}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              badge="Photos & Product Updates"
              title="Visual updates from DeGroff Aviation Technologies"
              lead="Explore PSV2™ deployments, RBF streamer options, and product detail close-ups requested by operator partners."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.04 }}
                  className="group relative overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-soft"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-105"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section id="specs" className="py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              badge="Technical Specifications"
              title="Technical data engineered for compliance and performance"
              lead="Every PSV2™ SmartCover™ is manufactured with rigorous quality controls, ensuring consistency, chemical resistance, and rapid auto-release performance."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {technicalSpecs.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
                  className="rounded-2xl border border-brand/10 bg-white p-6 shadow-soft"
                >
                  <span className="text-sm font-semibold uppercase tracking-wide text-brand">{spec.label}</span>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/70">{spec.value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-14 overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-soft">
              <div className="border-b border-brand/10 bg-brand/5 px-6 py-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-brand">Technical Documents</h3>
              </div>
              <div className="divide-y divide-brand/10">
                {technicalDocuments.map((doc) => (
                  <div
                    key={doc.title}
                    className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-brand-dark">{doc.title}</h4>
                      <p className="mt-1 text-xs text-brand-dark/60">{doc.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={doc.src}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-brand/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand transition hover:border-brand hover:text-brand-dark"
                      >
                        View
                      </a>
                      <a
                        href={doc.src}
                        download
                        className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-soft transition hover:bg-brand-dark"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Procurement */}
        <section id="procurement" className="py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-3xl border border-brand/10 bg-white p-10 shadow-soft"
              >
                <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Purchasing & Logistics
                </span>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
                  For purchasing & pricing information, contact our exclusive distributor: Proponent
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-dark/70">
                  Email {" "}
                  <a href="mailto:support@proponent.com" className="font-semibold text-brand hover:text-brand-dark">
                    support@proponent.com
                  </a>{" "}
                  to coordinate your PSV2™ SmartCover™ acquisition and fleet deployment planning.
                </p>
                <ul className="mt-6 grid gap-3 text-sm text-brand-dark/70">
                  {procurementSupport.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-brand">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {documentSheets
                    .map((doc, index) => ({ doc, index }))
                    .filter(({ doc }) => doc.type === "image")
                    .map(({ doc, index }) => (
                    <motion.button
                      key={doc.title}
                      type="button"
                      onClick={() => setActiveDocumentIndex(index)}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
                      className="flex items-start gap-4 rounded-2xl border border-brand/10 bg-white p-4 text-left shadow-soft transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-lifted"
                    >
                      <div className="relative h-20 w-16 overflow-hidden rounded-lg border border-brand/10">
                        <Image src={doc.preview} alt={doc.title} fill className="object-cover" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-brand-dark">{doc.title}</h4>
                        <p className="text-xs leading-relaxed text-brand-dark/60">{doc.description}</p>
                        <span className="text-xs font-semibold text-brand">View full sheet</span>
                      </div>
                    </motion.button>
                    ))}
                </div>
                <div className="mt-10 grid gap-6">
                  {distributorGroups.map((group) => (
                    <div key={group.category}>
                      <h3 className="text-lg font-semibold text-brand-dark">{group.category}</h3>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {group.segments.map((segment, segmentIndex) => (
                          <motion.div
                            key={segment.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.35, ease: "easeOut", delay: segmentIndex * 0.05 }}
                            className="rounded-2xl border border-brand/10 bg-white p-4 shadow-soft"
                          >
                            <h4 className="text-sm font-semibold text-brand-dark">{segment.title}</h4>
                            <ul className="mt-3 space-y-2 text-sm text-brand-dark/70">
                              {segment.items.map((entry) => (
                                <li key={entry} className="flex gap-2">
                                  <span className="text-brand">–</span>
                                  {entry}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="mx-auto h-fit max-w-sm rounded-3xl border border-brand/10 bg-white p-6 text-center shadow-soft"
              >
                {partnerLogos.map((logo) => (
                  <div key={logo.src} className="flex items-center justify-center rounded-2xl border border-brand/10 bg-brand/5 p-4">
                    <Image src={logo.src} alt={logo.alt} width={180} height={96} />
                  </div>
                ))}
                <div className="mt-8 grid gap-3">
                  <a
                    className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
                    href="mailto:support@proponent.com"
                  >
                    Contact Proponent
                  </a>
                  <a
                    className="inline-flex items-center justify-center rounded-full border border-brand/20 px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:text-brand-dark"
                    href="https://www.proponent.com/"
                  >
                    Visit proponent.com
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 sm:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <NewsletterForm />
          </div>
        </section>

        {/* Footer */}
        <section aria-labelledby="contact-heading" className="bg-white py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-3xl border border-brand/10 bg-white p-10 shadow-soft">
                <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Since 1985
                </span>
                <h2 id="contact-heading" className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
                  Committed to aviation safety leadership
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-dark/70">
                  DeGroff Aviation Technologies pairs pilot experience with engineering excellence to deliver the only heat-activated
                  self-disengaging pitot cover on the market. PSV2™ protects commercial, executive, and defense aircraft from COPEs and
                  fouled probes.
                </p>
                <div className="mt-8 max-w-sm">
                  <Image
                    src={asset("/assets/footer-badges.png")}
                    alt="DeGroff Aviation Technologies memberships and certifications"
                    width={360}
                    height={120}
                  />
                </div>
              </div>
              <ContactDetails />
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-brand/10 pt-6 text-xs text-brand-dark/60">
              <p>
                © {year} DeGroff Aviation Technologies. All rights reserved. Website designed by John Russell and DeGroff.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a className="hover:text-brand" href="#hero">
                  Back to top
                </a>
                <a className="hover:text-brand" href="mailto:info@degroffaviation.com">
                  Request documentation
                </a>
                <a className="hover:text-brand" href="https://mullign.github.io/Degroff/">
                  Live site
                </a>
                <a
                  className="flex items-center gap-2 rounded-full border border-brand/10 px-3 py-1.5 text-brand-dark transition hover:border-brand hover:text-brand-dark"
                  href="https://www.facebook.com/profile.php?id=61583542143823"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="DeGroff Aviation Technologies on Facebook"
                >
                  <Image src={asset("/assets/facebook.svg")} alt="" width={16} height={16} />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {activeDocument && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeDocument.title}
          onClick={handleDocumentClose}
          className="fixed inset-0 z-50 grid place-items-center bg-brand-dark/25 px-4 backdrop-blur"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-lifted"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-brand/10 px-6 py-4">
              <h3 className="text-lg font-semibold text-brand-dark">{activeDocument.title}</h3>
              <button
                type="button"
                aria-label="Close document viewer"
                onClick={handleDocumentClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand/20 text-brand transition hover:border-brand hover:text-brand-dark"
              >
                ×
              </button>
            </header>
            <div className="flex max-h-[70vh] items-center justify-center overflow-auto bg-brand-soft p-6">
              {activeDocument.type === "pdf" ? (
                <iframe
                  src={`${activeDocument.src}#view=FitH`}
                  title={`${activeDocument.title} PDF`}
                  className="h-[70vh] w-full rounded-2xl border border-brand/10 bg-white shadow-soft"
                />
              ) : (
                <Image
                  src={activeDocument.src}
                  alt={activeDocument.title}
                  width={1200}
                  height={1554}
                  priority
                  className="h-auto w-full max-w-2xl rounded-2xl border border-brand/10 shadow-soft"
                />
              )}
            </div>
            <div className="flex items-center justify-end gap-4 border-t border-brand/10 px-6 py-4 text-sm font-semibold text-brand">
              <a href={activeDocument.src} target="_blank" rel="noreferrer" className="hover:text-brand-dark">
                Open in new tab
              </a>
              <a href={activeDocument.src} download className="hover:text-brand-dark">
                Download sheet
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

