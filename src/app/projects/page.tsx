"use client";

import { useState } from "react";
import data from "@/data/portfolio.json";
import ProjectCard from "@/components/ui/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

const ALL = "All";

export default function ProjectsPage() {
  const categories = [ALL, ...Array.from(new Set(data.projects.map((p) => p.category)))];
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? data.projects : data.projects.filter((p) => p.category === active);

  return (
    <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 grain">
      {/* Header */}
      <div className="mb-14">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
          style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
        >
          Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          A collection of things I&apos;ve built — from SaaS platforms to mobile apps.
        </motion.p>
      </div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex gap-2 mb-10 flex-wrap"
      >
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="relative px-5 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
              style={{
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                backgroundColor: isActive ? "var(--accent-muted)" : "var(--bg-elevated)",
                border: `1px solid ${isActive ? "var(--accent-border)" : "var(--border)"}`,
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
