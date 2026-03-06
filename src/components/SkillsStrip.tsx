"use client";

import { motion } from "framer-motion";

export default function SkillsStrip({ skills }: { skills: string[] }) {
  // Duplicate for seamless loop
  const doubled = [...skills, ...skills];

  return (
    <div className="overflow-hidden -mx-6 px-6">
      <p
        className="text-xs font-bold tracking-[0.25em] uppercase text-neutral-400 mb-5"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Tech Stack
      </p>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-3 w-max"
        >
          {doubled.map((skill, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="px-5 py-2 bg-surface border border-neutral-200 text-neutral-600 text-sm font-medium rounded-full whitespace-nowrap cursor-default shadow-subtle hover:border-accent/30 hover:text-accent transition-colors duration-200"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
