"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimVariant = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "none";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimVariant;
  /** If true, element will fade out when scrolled past (not just fade in once) */
  bidirectional?: boolean;
}

const variantMap: Record<AnimVariant, Variants> = {
  fadeUp: {
    hidden:  { opacity: 0, y: 52, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0,  filter: "blur(0px)" },
    exit:    { opacity: 0, y: -20, filter: "blur(2px)" },
  },
  fadeIn: {
    hidden:  { opacity: 0, filter: "blur(6px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
    exit:    { opacity: 0, filter: "blur(4px)" },
  },
  slideLeft: {
    hidden:  { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0   },
    exit:    { opacity: 0, x: 24  },
  },
  slideRight: {
    hidden:  { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0  },
    exit:    { opacity: 0, x: -24 },
  },
  scale: {
    hidden:  { opacity: 0, scale: 0.92, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1,    filter: "blur(0px)" },
    exit:    { opacity: 0, scale: 0.96, filter: "blur(2px)" },
  },
  none: {
    hidden:  {},
    visible: {},
    exit:    {},
  },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
  bidirectional = false,
}: Props) {
  const variants = variantMap[variant];

  return (
    <motion.section
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      // Only exit-animate (disappear) if bidirectional is requested
      // exit is triggered when element leaves viewport upward via viewport.once=false
      viewport={{
        once: !bidirectional,
        margin: bidirectional ? "-60px 0px -60px 0px" : "-80px",
        amount: 0.1,
      }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
