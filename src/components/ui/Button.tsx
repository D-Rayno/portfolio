"use client";

import { ReactNode } from "react";
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const bgX = useTransform(springX, [-50, 50], ["0%", "100%"]);
  const bgY = useTransform(springY, [-20, 20], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Primary: use a fixed dark bg (#0c0c0f) so text is always white and readable
  // in both light AND dark mode. In dark mode, var(--text-primary) is near-white
  // which would make white text invisible — so we never use it as a bg color.
  const variantStyle: React.CSSProperties =
    variant === "primary"
      ? {
          backgroundColor: "#0c0c0f",
          color: "#ffffff",
          border: "1px solid transparent",
        }
      : variant === "outline"
      ? {
          backgroundColor: "transparent",
          color: "var(--text-primary)",
          border: "1px solid var(--border)",
        }
      : {
          backgroundColor: "transparent",
          color: "var(--text-secondary)",
          border: "1px solid transparent",
        };

  const shimmerColor =
    variant === "primary"
      ? "rgba(255,255,255,0.09)"
      : "rgba(109,110,247,0.08)";

  const base =
    "relative px-5 py-2.5 rounded-xl font-medium text-sm tracking-wide flex items-center justify-center gap-2 overflow-hidden";

  const motionProps = {
    className: `${base} ${className}`,
    style: variantStyle,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 25 } as object,
  };

  const inner = (
    <>
      {/* Magnetic shimmer */}
      <motion.span
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: useTransform(
            [bgX, bgY],
            ([bx, by]) =>
              `radial-gradient(circle at ${bx} ${by}, ${shimmerColor} 0%, transparent 70%)`
          ),
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        {...(motionProps as React.ComponentProps<typeof motion.a>)}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      {...(motionProps as React.ComponentProps<typeof motion.button>)}
    >
      {inner}
    </motion.button>
  );
}
