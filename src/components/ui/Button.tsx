"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const bgX = useTransform(springX, [-50, 50], ["0%", "100%"]);
  const bgY = useTransform(springY, [-20, 20], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    "relative px-6 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden cursor-pointer select-none";

  const variants = {
    primary: {
      className: "bg-primary text-white border border-transparent",
      shimmer: "rgba(255,255,255,0.08)",
    },
    outline: {
      className: "bg-transparent text-primary border border-neutral-200",
      shimmer: "rgba(91,92,246,0.06)",
    },
    ghost: {
      className: "bg-transparent text-neutral-500 border border-transparent",
      shimmer: "rgba(0,0,0,0.04)",
    },
  };

  const variantConfig = variants[variant];
  const combinedStyles = `${baseStyles} ${variantConfig.className} ${className}`;

  const commonMotionProps = {
    className: combinedStyles,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    style: {
      boxShadow: variant === "primary" ? "0 1px 2px rgba(0,0,0,0.1)" : undefined,
    },
  };

  const inner = (
    <>
      {/* Magnetic shimmer layer */}
      <motion.span
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: useTransform(
            [bgX, bgY],
            ([bx, by]) =>
              `radial-gradient(circle at ${bx} ${by}, ${variantConfig.shimmer} 0%, transparent 70%)`
          ),
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        {...commonMotionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      {...commonMotionProps}
    >
      {inner}
    </motion.button>
  );
}
