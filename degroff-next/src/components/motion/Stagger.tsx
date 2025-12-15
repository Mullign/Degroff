'use client';

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
};

const baseTransition = {
  duration: 0.45,
  ease: "easeOut" as const,
  staggerChildren: 0.08,
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Stagger({ children, className, delayChildren }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={{
        ...containerVariants,
        show: {
          ...containerVariants.show,
          transition: {
            ...baseTransition,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : (
          <motion.div variants={itemVariants}>{children}</motion.div>
        )}
    </motion.div>
  );
}







