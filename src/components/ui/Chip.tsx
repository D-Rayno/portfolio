"use client";

import { motion } from "framer-motion";

export default function Chip({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="px-3 py-1 bg-accent-muted text-accent text-xs font-semibold rounded-lg border border-accent/15 uppercase tracking-widest cursor-default"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {label}
    </motion.span>
  );
}
