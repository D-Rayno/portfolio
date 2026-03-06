"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Monitor, Smartphone, Server, BookOpen, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Monitor, Smartphone, Server, BookOpen,
};

interface Service { id: string; icon: string; title: string; description: string; }

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 28, scale: 0.96, filter: "blur(3px)" },
  visible:  {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <motion.div
      className="grid sm:grid-cols-2 gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </motion.div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[service.icon] ?? Monitor;

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 320, damping: 22 } }}
      className="group relative p-6 rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: hovered ? "var(--accent-border)" : "var(--border)",
        boxShadow: hovered
          ? "0 20px 50px -12px rgba(91,92,246,0.14), var(--shadow-lg)"
          : "var(--shadow)",
        transition: "border-color 0.3s, box-shadow 0.35s",
      }}
    >
      {/* Background shimmer on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "radial-gradient(ellipse at 20% 50%, var(--accent-muted) 0%, transparent 60%)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          animate={hovered
            ? { backgroundColor: "var(--accent)", scale: 1.1, rotate: 5 }
            : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: "var(--accent-muted)" }}
        >
          <motion.div
            animate={hovered ? { color: "#ffffff" } : { color: "var(--accent)" }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={20} />
          </motion.div>
        </motion.div>

        <motion.h3
          animate={hovered ? { color: "var(--accent)" } : { color: "var(--text-primary)" }}
          transition={{ duration: 0.2 }}
          className="font-bold text-base mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {service.title}
        </motion.h3>

        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {service.description}
        </p>

        {/* Arrow that appears on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-5 right-5 w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
