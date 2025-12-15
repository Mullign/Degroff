'use client';

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
};

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
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
            ...containerVariants.show.transition,
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






