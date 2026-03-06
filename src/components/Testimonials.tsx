"use client";

import { motion } from "framer-motion";

interface Testimonial { id: string; name: string; role: string; avatar: string; text: string; }

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ y: -3 }}
          className="p-6 rounded-2xl border flex flex-col gap-4 transition-all duration-300"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          }}
        >
          {/* Quote mark */}
          <span className="text-4xl font-black leading-none" style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}>&ldquo;</span>
          <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
            {item.text}
          </p>
          <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)", fontFamily: "var(--font-display)" }}
            >
              {item.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                {item.name}
              </p>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{item.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
