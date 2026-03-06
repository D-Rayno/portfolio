"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Testimonial { id: string; name: string; role: string; avatar: string; text: string; }

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 36, scale: 0.95, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <motion.div
      className="grid md:grid-cols-3 gap-5"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {items.map((item) => (
        <TestimonialCard key={item.id} item={item} />
      ))}
    </motion.div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="relative p-6 rounded-2xl border flex flex-col gap-4 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: hovered ? "var(--accent-border)" : "var(--border)",
        boxShadow: hovered
          ? "0 24px 50px -12px rgba(91,92,246,0.14)"
          : "var(--shadow)",
        transition: "border-color 0.3s, box-shadow 0.35s",
      }}
    >
      {/* Background glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              background:
                "radial-gradient(circle at 80% 20%, var(--accent-muted) 0%, transparent 60%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Quote mark */}
      <motion.span
        animate={hovered ? { scale: 1.15, color: "var(--accent)" } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-4xl font-black leading-none relative z-10"
        style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
      >
        &ldquo;
      </motion.span>

      <p className="text-sm leading-relaxed flex-1 relative z-10" style={{ color: "var(--text-secondary)" }}>
        {item.text}
      </p>

      <div
        className="flex items-center gap-3 pt-2 border-t relative z-10"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <motion.div
          animate={hovered
            ? { backgroundColor: "var(--accent)", color: "#fff", scale: 1.08 }
            : { scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{
            backgroundColor: "var(--accent-muted)",
            color: "var(--accent)",
            fontFamily: "var(--font-display)",
          }}
        >
          {item.avatar}
        </motion.div>
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
          >
            {item.name}
          </p>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            {item.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
