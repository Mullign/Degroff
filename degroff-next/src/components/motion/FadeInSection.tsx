'use client';

import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type FadeInSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeInSection({ children, className, delay = 0 }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}







