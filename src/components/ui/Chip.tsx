"use client";

import { motion } from "framer-motion";

export default function Chip({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.06, y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="px-3 py-1 text-xs font-semibold rounded-lg border uppercase tracking-widest cursor-default"
      style={{
        backgroundColor: "var(--accent-muted)",
        color: "var(--accent)",
        borderColor: "var(--accent-border)",
        fontFamily: "var(--font-display)",
      }}
    >
      {label}
    </motion.span>
  );
}
