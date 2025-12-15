'use client';

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionCard({ children, className = "", delay = 0 }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={`glass-card border border-white/40 bg-white/80 shadow-soft backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lifted hover:border-brand/40 ${className}`}
    >
      {children}
    </motion.div>
  );
}



