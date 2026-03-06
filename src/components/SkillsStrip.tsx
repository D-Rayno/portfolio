"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import techIcons from "@/data/techIcons";
import Image from "next/image";

interface Props {
  skills: string[];
}

export default function SkillsStrip({ skills }: Props) {
  return (
    <div>
      <p
        className="text-xs font-bold tracking-[0.25em] uppercase mb-6"
        style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-display)" }}
      >
        Tech Stack
      </p>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3">
        {skills.map((skill, i) => (
          <SkillCard key={skill} skill={skill} index={i} />
        ))}
      </div>
    </div>
  );
}

function SkillCard({ skill, index }: { skill: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const icon = techIcons[skill];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.04,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-2.5 p-3 rounded-2xl border transition-all duration-300 cursor-default"
      style={{
        backgroundColor: hovered
          ? icon
            ? `${icon.color}14`
            : "var(--bg-elevated)"
          : "var(--bg-surface)",
        borderColor: hovered
          ? icon
            ? `${icon.color}55`
            : "var(--accent-border)"
          : "var(--border)",
        boxShadow: hovered
          ? icon
            ? `0 8px 30px -8px ${icon.color}30`
            : "var(--shadow-lg)"
          : "var(--shadow)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Icon */}
      <div className="w-9 h-9 flex items-center justify-center shrink-0">
        {icon ? (
<div className="flex flex-col items-center justify-center gap-3 group cursor-pointer">
      <div 
        className="w-16 h-16 flex items-center justify-center p-3 rounded-2xl bg-white border border-neutral-200 shadow-sm transition-all duration-300 group-hover:shadow-float group-hover:-translate-y-1 relative overflow-hidden"
      >
        {/* Subtle glow effect behind the icon on hover using the brand color */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{ backgroundColor: icon.color }}
        />
        
        <Image
          src={`/assets/tech-logos/${icon.filename}`}
          alt={`${skill} logo`}
          width={40}
          height={40}
          className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase group-hover:text-primary transition-colors">
        {skill}
      </span>
    </div>
        ) : (
          // Fallback: first 2 letters
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: "var(--accent-muted)",
              color: "var(--accent)",
              fontFamily: "var(--font-display)",
            }}
          >
            {skill.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Label */}
      <span
        className="text-center leading-tight"
        style={{
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: hovered
            ? icon
              ? icon.color
              : "var(--accent)"
            : "var(--text-tertiary)",
          fontFamily: "var(--font-display)",
          transition: "color 0.2s ease",
          wordBreak: "break-word",
          lineHeight: "1.2",
        }}
      >
        {skill}
      </span>

      {/* Hover glow dot */}
      {hovered && icon && (
        <motion.div
          layoutId={`glow-${skill}`}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at 50% 30%, ${icon.color}18 0%, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
}
