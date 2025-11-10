'use client';

import { FormEvent, useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_dw49i0o";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_ifsa9jp";

const REQUIRED_PUBLIC_KEY_WARNING =
  "[NewsletterForm] Missing NEXT_PUBLIC_EMAILJS_PUBLIC_KEY. Set it to enable EmailJS submissions.";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [neverShowAgain, setNeverShowAgain] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const publicKey = useMemo(() => process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "", []);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const dismissed = window.localStorage.getItem("psv2-newsletter-dismissed") === "true";
      setNeverShowAgain(dismissed);
      setIsVisible(!dismissed);
    }
  }, []);

  useEffect(() => {
    try {
      if (publicKey) {
        emailjs.init({
          publicKey,
          blockHeadless: true,
          limitRate: {
            id: "psv2-newsletter",
            throttle: 30000,
          },
        });
      } else {
        console.warn(REQUIRED_PUBLIC_KEY_WARNING);
      }
    } catch (error) {
      console.error("[NewsletterForm] Failed to initialize EmailJS:", error);
    }
  }, [publicKey]);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    if (neverShowAgain) {
      window.localStorage.setItem("psv2-newsletter-dismissed", "true");
      setIsVisible(false);
    } else {
      window.localStorage.removeItem("psv2-newsletter-dismissed");
    }
  }, [neverShowAgain, isMounted]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!publicKey) {
      console.error(REQUIRED_PUBLIC_KEY_WARNING);
      setStatus("error");
      setErrorMessage("Newsletter is temporarily unavailable. Please contact info@degroffaviation.com instead.");
      return;
    }

    if (!name || !email) {
      setStatus("error");
      setErrorMessage("Please provide both your name and email address.");
      return;
    }

    try {
      const templateParams = { name, email, channel: "NextJS Landing Page" };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      setStatus("success");
      event.currentTarget.reset();
    } catch (error: unknown) {
      console.error("[NewsletterForm] EmailJS error:", error);
      setStatus("error");
      if (typeof error === "object" && error && "text" in error) {
        setErrorMessage(String((error as { text?: string }).text) || "Unable to submit form.");
      } else {
        setErrorMessage("Unable to submit form. Please try again shortly or email info@degroffaviation.com.");
      }
    }
  };

  if (!isVisible) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-brand/10 bg-white p-8 shadow-soft">
        <div className="space-y-2">
          <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
            Updates Paused
          </span>
          <h3 className="text-xl font-semibold text-brand-dark">Newsletter updates are turned off.</h3>
          <p className="max-w-xl text-sm leading-relaxed text-brand-dark/70">
            You selected “Never show again.” Re-enable the newsletter to keep receiving PitotShield V2™ SmartCover™ (PSV2)
            updates.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setNeverShowAgain(false);
            setIsVisible(true);
          }}
          className="inline-flex items-center justify-center rounded-full border border-brand/20 px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:text-brand-dark"
        >
          Re-enable newsletter
        </button>
      </div>
    );
  }

  return (
    <div
      id="newsletter"
      className="grid gap-8 rounded-3xl border border-brand/10 bg-white p-10 shadow-soft lg:grid-cols-[minmax(0,1fr)_320px]"
    >
      <form className="flex flex-col gap-8" onSubmit={handleSubmit} autoComplete="on">
        <div className="space-y-4">
          <span className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand">
            Stay Updated
          </span>
          <h3 className="text-2xl font-semibold text-brand-dark sm:text-3xl">Newsletter & Product Updates</h3>
          <p className="max-w-xl text-sm leading-relaxed text-brand-dark/70">
            Join maintenance leaders receiving insights on PitotShield V2™ SmartCover™ (PSV2) releases, deployment guides, and
            mission-ready checklists.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-dark/80">
            Full Name
            <input
              id="newsletterName"
              name="name"
              type="text"
              placeholder="Captain Jordan Lee"
              autoComplete="name"
              required
              className="h-12 rounded-xl border border-brand/15 bg-brand-soft px-4 text-sm font-normal text-brand-dark outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-dark/80">
            Work Email
            <input
              id="newsletterEmail"
              name="email"
              type="email"
              placeholder="ops@flightdepartment.com"
              autoComplete="email"
              required
              className="h-12 rounded-xl border border-brand/15 bg-brand-soft px-4 text-sm font-normal text-brand-dark outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-progress disabled:opacity-70"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe for PSV2 Updates"}
          </button>
          <label className="flex items-center gap-2 text-xs text-brand-dark/70">
            <input
              type="checkbox"
              checked={neverShowAgain}
              onChange={(event) => setNeverShowAgain(event.target.checked)}
              className="h-4 w-4 rounded border-brand/30 text-brand focus:ring-brand"
            />
            Never show this message again
          </label>
        </div>

        <p className="text-xs text-brand-dark/60">
          Prefer direct contact? Email{" "}
          <a href="mailto:info@degroffaviation.com" className="font-semibold text-brand hover:text-brand-dark">
            info@degroffaviation.com
          </a>{" "}
          for PSV2™ inquiries.
        </p>

        <div aria-live="polite" className="min-h-[24px] text-sm">
          {status === "success" && (
            <p className="font-semibold text-emerald-600">
              Thank you. We&apos;ll keep you informed on PitotShield V2™ SmartCover™ (PSV2) innovations.
            </p>
          )}
          {status === "error" && errorMessage && (
            <p className="font-semibold text-rose-600">
              <strong>Submission failed:</strong> {errorMessage}
            </p>
          )}
        </div>
      </form>

      <aside className="rounded-2xl border border-brand/10 bg-brand-soft/60 p-6 shadow-soft">
        <div>
          <h4 className="text-sm font-semibold text-brand-dark">What you&apos;ll receive</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-dark/70">
            <li>COPEs prevention playbooks tailored for flight ops</li>
            <li>Deployment guides for PitotShield V2™ SmartCover™ (PSV2)</li>
            <li>Certified training and maintenance notifications</li>
            <li>Exclusive briefings from DeGroff Aviation leadership</li>
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-brand-dark">Frequency</h4>
          <p className="mt-2 text-sm text-brand-dark/70">1–2 curated messages per month. Unsubscribe at any time.</p>
        </div>
      </aside>
    </div>
  );
}

