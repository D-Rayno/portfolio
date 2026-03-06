"use client";

import { motion } from "framer-motion";

export default function SkillsStrip({ skills }: { skills: string[] }) {
  const doubled = [...skills, ...skills];
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.25em] uppercase mb-5" style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-display)" }}>
        Tech Stack
      </p>
      <div className="relative overflow-hidden -mx-6">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-3 w-max px-6"
        >
          {doubled.map((skill, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="px-5 py-2 border text-sm font-medium rounded-full whitespace-nowrap cursor-default transition-colors duration-200"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-secondary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
