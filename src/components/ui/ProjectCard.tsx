"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Chip from "./Chip";

export default function ProjectCard({ title, description, technologies, link }: Project) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 200, damping: 25 });
  const my = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-5deg", "5deg"]);
  const glowX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        backgroundColor: "var(--bg-surface)",
        borderColor: hovered ? "var(--accent-border)" : "var(--border)",
        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="relative p-7 rounded-2xl border overflow-hidden cursor-default"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform([glowX, glowY], ([gx, gy]) =>
            `radial-gradient(circle at ${gx} ${gy}, var(--accent-muted) 0%, transparent 65%)`),
        }}
      />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
            {title}
          </h3>
          <motion.a
            href={link}
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200"
            style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-tertiary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-elevated)"; e.currentTarget.style.color = "var(--text-tertiary)"; }}
          >
            <ArrowUpRight size={17} />
          </motion.a>
        </div>
        <p className="mb-6 leading-relaxed text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <motion.div key={tech} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Chip label={tech} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
