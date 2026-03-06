"use client";

import { motion } from "framer-motion";

interface Stat { id: string; value: string; label: string; }

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--border)" }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="flex flex-col items-center justify-center py-8 px-4 text-center"
          style={{ backgroundColor: "var(--bg-surface)" }}
        >
          <span
            className="text-4xl font-extrabold mb-1"
            style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
          >
            {stat.value}
          </span>
          <span className="text-xs font-medium tracking-wide uppercase" style={{ color: "var(--text-tertiary)" }}>
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
