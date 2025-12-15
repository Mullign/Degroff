'use client';

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-sky-500 via-brand to-indigo-500 text-white shadow-soft hover:shadow-lifted hover:-translate-y-0.5 active:translate-y-0 border border-white/10 relative overflow-hidden",
  secondary:
    "bg-white text-brand-dark border border-brand/20 hover:border-brand hover:bg-brand/5 hover:text-brand-dark shadow-soft",
  ghost: "bg-transparent text-brand-dark/80 hover:text-brand hover:bg-brand/5 border border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-6 py-3",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  className,
  variant,
  size,
  leftIcon,
  rightIcon,
  loading,
  children,
  ...props
}: ButtonProps) {
  const finalVariant = variant ?? "primary";
  const finalSize = size ?? "md";
  const composed =
    `${baseClasses} ${variantClasses[finalVariant]} ${sizeClasses[finalSize]} ${className ?? ""}`.trim();

  return (
    <button className={composed} {...props}>
      {/* Shine overlay for primary variant */}
      {finalVariant === "primary" && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_1.8s_ease-in-out_infinite]" />
        </span>
      )}
      <span className={`relative flex items-center gap-2 ${loading ? "opacity-80" : ""}`}>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{loading ? "Please wait…" : children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </span>
    </button>
  );
}


