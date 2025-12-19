'use client';

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Button } from "@/components/ui/Button";
import { MotionCard } from "@/components/motion/MotionCard";
import { useTheme } from "@/components/ThemeProvider";

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
    copy: "One-piece polypropylene body with no fabric to unravel, reducing FOD risks across flight lines, hangars, and ramps.",
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
  { label: "Security", value: "PitotShield V2™ SmartCover™ Universal-Fit Detaining Bridle" },
  { label: "Compliance", value: "Designed around FAA and IATA safety practices; ramp and shop friendly" },
];

const trainingVideos = [
  {
    title: "PSV2™ Aircraft Test Footage",
    description: "Real-world pitot protection tests showing PSV2™ performance in active flight operations.",
    src: asset("/assets/4th_vid/PitotShield v2 Aircraft Test Videos.mp4"),
  },
  {
    title: "PSV2™ with Retaining Bridle – Delta TOC Port",
    description: "Demonstration of the universal-fit detaining bridle installed on a Delta TOC pitot port.",
    src: asset("/assets/4th_vid/PSV2 w_ Retaining Bridle Delta TOC Port.mp4"),
  },
  {
    title: "PSV2™ Universal Fit Demo",
    description: "Overview of the PSV2™ SmartCover™ universal-fit geometry across multiple pitot probe styles.",
    src: asset("/assets/4th_vid/PSV2 Universal Fit Demo.mp4"),
  },
  {
    title: "PSV2™ Return to Service Training",
    description: "Step-by-step return to service procedure training for maintenance teams and flight departments.",
    src: asset("/assets/4th_vid/PSV2 Return to Service Procedure Training Video.mp4"),
  },
  {
    title: "PSV2™ Ramp Operations Clip",
    description: "Short ramp-side clip of PSV2™ handling and installation during preflight preparation.",
    src: asset("/assets/4th_vid/IMG 1516   1080p.mp4"),
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
    title: "PitotShield V2™ Operations Manual",
    description: "Comprehensive PSV2™ SmartCover™ manual for maintenance and training personnel.",
    src: asset("/docs/pitotshield-v2-manual.pdf"),
    preview: asset("/assets/psv2-intro-sheet.jpg"),
    type: "pdf",
  },
  {
    title: "PitotShield V2™ Safety & Compliance",
    description: "Regulatory compliance guidance, safety data, and operational standards for PSV2™.",
    src: asset("/docs/psv2-wp-marketing-version-w-all-econ.pdf"),
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
    title: "PitotShield V2™ Catalog (May 2025)",
    description: "Comprehensive PSV2™ SmartCover™ product catalog with fit guides, accessories, and ordering references.",
    src: asset("/docs/pitotshield-v2-catalog-05-25.pdf"),
    preview: asset("/assets/psv2-packaging.jpg"),
    type: "pdf",
  },
];

const technicalDocuments = documentSheets.filter((doc) => doc.type === "pdf");

const proponentSupport = [
  "Dedicated PSV2™ SmartCover™ sales and logistics specialists",
  "Rapid-response quoting and fleet rollout coordination",
  "Global inventory stocking with aerospace-grade fulfillment",
  "Technical documentation and certification packets on demand",
];

const SectionHeader = ({ badge, title, lead }: { badge: string; title: string; lead: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    className="mx-auto mb-16 max-w-4xl text-center"
  >
    <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
      {badge}
    </span>
    <h2 className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">{title}</h2>
    <p className="mt-5 text-base leading-relaxed text-brand-dark/75 sm:text-lg max-w-3xl mx-auto">{lead}</p>
  </motion.div>
);

const ContactDetails = () => (
  <div id="contact" className="rounded-3xl border border-brand/15 bg-[#f3f4f6] dark:bg-slate-800 dark:border-slate-700 p-8 sm:p-10 shadow-soft">
    <h3 className="text-2xl font-semibold text-brand-dark dark:text-slate-100 sm:text-3xl">DeGroff Aviation Technologies™</h3>
    <p className="mt-5 text-base leading-relaxed text-brand-dark/80 dark:text-slate-300">
      DeGroff Aviation Technologies™, LLC
      <br />
      150 Forest Park Dr.
      <br />
      Berne, IN 46711
    </p>
    <p className="mt-5">
      <a href="mailto:info@degroffaviation.com" className="text-base font-semibold text-brand dark:text-cyan-400 hover:text-brand-dark dark:hover:text-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded">
        info@degroffaviation.com
      </a>
    </p>
    <div className="mt-8 flex flex-wrap gap-3">
      <a
        className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lifted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
        href="mailto:info@degroffaviation.com"
      >
        Contact DeGroff Aviation
      </a>
      <a
        className="inline-flex items-center justify-center rounded-full border border-brand/20 dark:border-slate-600 px-5 py-3.5 text-sm font-semibold text-brand dark:text-cyan-400 transition-all duration-200 hover:border-brand dark:hover:border-cyan-400 hover:bg-brand/5 dark:hover:bg-slate-700 hover:text-brand-dark dark:hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
        href="https://www.linkedin.com/company/degroff-aviation-technology/posts/?feedView=all"
        target="_blank"
        rel="noreferrer"
      >
        Follow on LinkedIn
      </a>
      <a
        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 dark:border-slate-600 px-5 py-3.5 text-sm font-semibold text-brand dark:text-cyan-400 transition-all duration-200 hover:border-brand dark:hover:border-cyan-400 hover:bg-brand/5 dark:hover:bg-slate-700 hover:text-brand-dark dark:hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
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
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <SiteHeader />
      <main className="text-brand-dark dark:text-slate-100">
        {/* Compatibility marquee */}
        <section aria-label="Fleet coverage marquee" className="bg-white dark:bg-slate-900 py-4">
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap text-xs font-semibold uppercase tracking-[0.32em] text-brand-dark/60 dark:text-slate-400">
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
        {/* Hero */}
        <section id="hero" className="relative overflow-hidden bg-white dark:bg-slate-950">
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand/20 blur-3xl animate-gradient" />
          <div className="pointer-events-none absolute right-[-120px] bottom-0 h-80 w-80 rounded-full bg-brand-dark/10 blur-3xl animate-gradient" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:items-center lg:gap-16">
            <div className="space-y-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-brand"
              >
                Stop Covered Pitot Events (COPEs)
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-4xl font-semibold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl leading-tight"
              >
                <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                  PitotShield V2™ SmartCover™ (PSV2)
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
                className="text-lg leading-relaxed text-brand-dark/75 sm:text-xl max-w-2xl"
              >
                Heat-activated, auto-releasing pitot tube cover engineered to eliminate COPEs, protect mission-critical probes, and
                keep crews focused on the mission — not on forgotten covers.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <a
                  className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lifted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
                  href="#technology"
                >
                  Explore the Technology
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-brand/20 dark:border-slate-600 px-6 py-3.5 text-sm font-semibold text-brand dark:text-cyan-400 transition-all duration-200 hover:border-brand dark:hover:border-cyan-400 hover:bg-brand/5 dark:hover:bg-slate-700 hover:text-brand-dark dark:hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
                  href="#psv2-demo"
                >
                  View PSV2™ in Action
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-brand/20 dark:border-slate-600 px-6 py-3.5 text-sm font-semibold text-brand dark:text-cyan-400 transition-all duration-200 hover:border-brand dark:hover:border-cyan-400 hover:bg-brand/5 dark:hover:bg-slate-700 hover:text-brand-dark dark:hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
                  href="#training-videos"
                >
                  See How It Works
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="relative hidden aspect-square rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800/60 shadow-lifted lg:block"
            >
              <Image
                src={asset("/assets/psv2-kit.jpg")}
                alt="PitotShield V2™ SmartCover™ (PSV2) kit and components"
                fill
                className="rounded-3xl object-cover"
                priority
              />
            </motion.div>
          </div>
          <div className="mx-auto grid max-w-7xl gap-4 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4 lg:pb-24">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-2xl border border-brand/10 bg-brand-soft dark:bg-slate-800 px-6 py-6 text-left shadow-soft transition-all duration-200 hover:shadow-lifted hover:-translate-y-1"
              >
                {stat.value && <span className="text-3xl font-semibold text-brand-dark">{stat.value}</span>}
                <p className="mt-2.5 text-sm leading-relaxed text-brand-dark/75">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5 lg:gap-12 lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-10 shadow-soft lg:col-span-3"
            >
              <h2 className="text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
                About DeGroff Aviation Technologies™
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-dark/75 sm:text-lg">
                Since 1985, DeGroff Aviation Technologies™ has brought together product development and pilot experience to create
                high-quality aircraft safety solutions for corporate, commercial, and general aviation.
              </p>
              <div className="mt-8 grid gap-6">
                {highlights.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-lg font-semibold text-brand-dark sm:text-xl">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-brand-dark/75 sm:text-base">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="flex flex-col gap-4 rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-4 shadow-soft lg:col-span-2">
              <div
                id="psv2-demo"
                className="relative w-full overflow-hidden rounded-xl border border-brand/10 aspect-video"
              >
                <video
                  className="h-full w-full object-cover"
                  controls
                  preload="metadata"
                  poster={asset("/assets/Accessories.png")}
                >
                  <source src={asset('/assets/pitotshield_v2_realfootage_teaser_captioned_360 (1).mp4')} type="video/mp4" />
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

        {/* Training & Demo Videos */}
        <section id="training-videos" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              badge="PSV2™ in Motion"
              title="Training, test, and deployment videos"
              lead="Explore PitotShield V2™ SmartCover™ (PSV2) performance and procedures through focused training clips, return-to-service walkthroughs, and aircraft test footage."
            />
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {trainingVideos.map((video, index) => (
                <MotionCard key={video.title} delay={index * 0.05} className="flex flex-col overflow-hidden rounded-3xl">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-brand/10 bg-black/5">
                    <video className="h-full w-full object-cover" controls preload="metadata">
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="mt-4 space-y-1.5 px-4 pb-4 pt-1 text-left">
                    <h3 className="text-sm font-semibold text-brand-dark sm:text-base">{video.title}</h3>
                    <p className="text-xs leading-relaxed text-brand-dark/70 sm:text-sm">{video.description}</p>
                  </div>
                </MotionCard>
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
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
                  className="rounded-2xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-6 sm:p-8 shadow-soft transition-all duration-200 hover:shadow-lifted hover:-translate-y-1"
                >
                  <h3 className="text-lg font-semibold text-brand-dark sm:text-xl">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/75 sm:text-base">{feature.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Operations */}
        <section id="benefits" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
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
                className="rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-8 shadow-soft lg:col-span-3"
              >
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark">Why teams choose PSV2™</h3>
                  <ul className="mt-4 space-y-3 text-sm text-brand-dark/75 sm:text-base">
                    <li className="flex gap-2">
                      <span className="text-brand">•</span>Reduces RTO risks from forgotten or fused pitot covers.
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
                  <h3 className="text-xl font-semibold text-brand-dark sm:text-2xl">Ideal for</h3>
                  <ul className="mt-4 space-y-3 text-sm text-brand-dark/75 sm:text-base">
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
                    className="relative rounded-2xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-6 shadow-soft transition-all duration-200 hover:shadow-lifted hover:-translate-y-1"
                  >
                    <span className="absolute top-6 left-6 h-3 w-3 rounded-full bg-brand shadow-[0_0_0_6px_rgba(42,127,255,0.12)]" />
                    <div className="pl-8">
                      <p className="font-semibold text-brand-dark sm:text-lg">{item.phase}</p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-dark/75 sm:text-base">{item.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features & Compatibility */}
        <section id="compatibility" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-10 shadow-soft"
              >
                <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Product Features
                </span>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark sm:text-5xl">
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
                className="rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-10 shadow-soft"
              >
                <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Fleet Compatibility
                </span>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark sm:text-5xl">
                  Certified coverage across leading aircraft
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-dark/75 sm:text-base">
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

        {/* Product Showcase */}
        <section id="product" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
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
                  className="overflow-hidden rounded-2xl border border-brand/10 bg-brand-soft dark:bg-slate-800 shadow-soft transition-all duration-200 hover:shadow-lifted hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-300 hover:scale-105" />
                  </div>
                  <figcaption className="px-4 py-3 text-sm text-brand-dark/75">{item.alt}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              badge="Photos & Product Updates"
              title="Visual updates from DeGroff Aviation Technologies™"
              lead="Explore PitotShield V2™ SmartCover™ (PSV2) deployments, RBF streamer options, and product detail close-ups requested by operator partners."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.04 }}
                  className="group relative overflow-hidden rounded-2xl border border-brand/10 bg-brand-soft dark:bg-slate-800 shadow-soft transition-all duration-200 hover:shadow-lifted hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-105"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section id="specs" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
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
                  className="rounded-2xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-6 shadow-soft"
                >
                  <span className="text-sm font-semibold uppercase tracking-wide text-brand">{spec.label}</span>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/75 sm:text-base">{spec.value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-14 overflow-hidden rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800 shadow-soft">
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
                        className="inline-flex items-center justify-center rounded-full border border-brand/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand transition-all duration-200 hover:border-brand hover:bg-brand/5 hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
                      >
                        View
                      </a>
                      <a
                        href={doc.src}
                        download
                        className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-soft transition-all duration-200 hover:bg-brand-dark hover:shadow-lifted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
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

        {/* Proponent Sales */}
        <section id="proponent" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-10 shadow-soft"
              >
                <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Proponent Sales
                </span>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
                  PSV2™ procurement through Proponent
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-brand-dark/75 sm:text-base">
                  <p>
                    Proponent is the exclusive distribution partner for PitotShield V2™ SmartCover™ (PSV2), supporting commercial,
                    business, and defense aviation programs worldwide.
                  </p>
                  <p>
                    Prefer to work directly with the manufacturer? Contact the DeGroff Aviation Technologies™ sales team at{" "}
                    <a href="mailto:info@degroffaviation.com" className="font-semibold text-brand hover:text-brand-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded">
                      info@degroffaviation.com
                    </a>{" "}
                    and we&apos;ll coordinate your PSV2™ deployment alongside Proponent.
                  </p>
                </div>
                <ul className="mt-6 grid gap-3 text-sm text-brand-dark/75 sm:text-base">
                  {proponentSupport.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-brand">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lifted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
                    href="mailto:support@proponent.com"
                  >
                    Contact Proponent Sales
                  </a>
                  <a
                    className="inline-flex items-center justify-center rounded-full border border-brand/20 px-6 py-3.5 text-sm font-semibold text-brand transition-all duration-200 hover:border-brand hover:bg-brand/5 hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
                    href="https://www.proponent.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit proponent.com
                  </a>
                  <a
                    className="inline-flex items-center justify-center rounded-full border border-brand/20 px-6 py-3.5 text-sm font-semibold text-brand transition-all duration-200 hover:border-brand hover:bg-brand/5 hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
                    href="mailto:info@degroffaviation.com"
                  >
                    Contact DeGroff Sales
                  </a>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
                className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-6 rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-8 text-center shadow-soft"
              >
                <div className="flex items-center justify-center rounded-2xl border border-brand/10 bg-brand/5 p-6">
                  <Image src={asset("/assets/logo-proponent.svg")} alt="Proponent logo" width={200} height={120} />
                </div>
                <div className="space-y-2 text-sm text-brand-dark/70">
                  <p className="font-semibold text-brand-dark">Primary Sales Desk</p>
                  <a href="mailto:support@proponent.com" className="font-semibold text-brand hover:text-brand-dark">
                    support@proponent.com
                  </a>
                  <p>Global support for PSV2™ SmartCover™ procurement & logistics.</p>
                </div>
                <div className="space-y-2 text-sm text-brand-dark/60">
                  <p className="font-semibold text-brand-dark">Locations</p>
                  <p>Los Angeles • Amsterdam • Singapore</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800 p-10 shadow-soft lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
              <div className="space-y-4">
                <p className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Testimonials
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
                  Real feedback from the flight deck.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-dark/75 sm:text-base">
                  Real feedback from pilots and aviation professionals who use our products. These testimonials reflect our commitment to quality, reliability,
                  and results. Every product is built on trust, innovation, and delivering real value.
                </p>
                <p className="mt-4 text-sm font-medium text-brand-dark sm:text-base">
                  "This should be the standard." — Corporate Pilot, Cook Medical
                </p>
              </div>
              <div className="mx-auto w-full max-w-xs overflow-hidden rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800/60">
                <Image
                  src={asset("/assets/Testinmonial.jpeg")}
                  alt='Testimonial about PitotShield V2™ SmartCovers™ from a corporate pilot'
                  width={400}
                  height={600}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <NewsletterForm />
          </div>
        </section>

        {/* Community & News */}
        <section className="py-20 sm:py-28 text-brand-dark">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 rounded-3xl border border-brand/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-10 shadow-soft lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
              <div>
                <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                  Community & News
                </span>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
                  Fail-safe Pitot Cover Aims To Save Lives, Money
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-dark/75 sm:text-base">
                  Coverage from AIN highlights how the PSV2™ SmartCover™ leverages simple chemistry to prevent COPEs, eliminate mission
                  delays, and protect flight crews worldwide.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lifted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
                    href="https://www.ainonline.com/aviation-news/aerospace/2025-10-15/fail-safe-pitot-cover-aims-save-lives-money"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read the AIN Feature
                  </a>
                  <span className="text-xs uppercase tracking-[0.28em] text-brand-dark/60">
                    Source: AIN Online — Fail-safe Pitot Cover Aims To Save Lives, Money (Oct 16, 2025)
                  </span>
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-brand/10 bg-brand-soft dark:bg-slate-800/60">
                <Image
                  src={asset("/assets/Steve Photo.jpg")}
                  alt="Steven DeGroff showcasing PitotShield V2™ SmartCover™ at NBAA-BACE"
                  width={960}
                  height={504}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section aria-labelledby="contact-heading" className="bg-white dark:bg-slate-900 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Membership & credibility card */}
              <div className="rounded-3xl border border-brand/15 bg-[#f3f4f6] dark:bg-slate-800 dark:border-slate-700 p-8 sm:p-10 shadow-soft">
                <span className="inline-flex items-center justify-center rounded-full border border-brand/20 bg-white dark:bg-slate-700 dark:border-slate-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-brand dark:text-cyan-400">
                  Since 1985
                </span>
                <h2
                  id="contact-heading"
                  className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark dark:text-slate-100 sm:text-4xl"
                >
                  Committed to aviation safety leadership
                </h2>
                <p className="mt-5 text-base leading-relaxed text-brand-dark/80 dark:text-slate-300">
                  DeGroff Aviation Technologies™ pairs pilot experience with engineering excellence to deliver the only heat-activated
                  self-disengaging pitot cover on the market. PSV2™ protects commercial, executive, and defense aircraft from COPEs and
                  fouled probes.
                </p>
                <div className="mt-8 max-w-sm rounded-2xl bg-[#e5e7eb] dark:bg-slate-700 p-4">
                  <Image
                    src={asset("/assets/footer-badges.png")}
                    alt="DeGroff Aviation Technologies™ memberships and certifications"
                    width={360}
                    height={120}
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <ContactDetails />
            </div>
            <div className="mt-16 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-6 border-t border-brand/10 dark:border-slate-700 pt-8 text-sm text-brand-dark/70 dark:text-slate-400">
              <p className="text-center sm:text-left">
                © {year} DeGroff Aviation Technologies™. All rights reserved. Website designed by Russell and DeGroff.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  className="inline-flex items-center justify-center rounded-full border border-brand/20 dark:border-slate-600 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-brand dark:text-cyan-400 transition-all duration-200 hover:border-brand dark:hover:border-cyan-400 hover:bg-brand/5 dark:hover:bg-slate-700 hover:text-brand-dark dark:hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
                  href="#hero"
                >
                  Back to Top
                </a>
                <a 
                  className="text-brand-dark/70 dark:text-slate-400 hover:text-brand dark:hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded px-2 py-1 min-h-[44px] flex items-center" 
                  href="mailto:info@degroffaviation.com"
                >
                  Request documentation
                </a>
                <a 
                  className="text-brand-dark/70 dark:text-slate-400 hover:text-brand dark:hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded px-2 py-1 min-h-[44px] flex items-center" 
                  href="https://mullign.github.io/Degroff/"
                >
                  Live site
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

