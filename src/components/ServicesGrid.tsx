"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Server, BookOpen, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Smartphone,
  Server,
  BookOpen,
};

interface Service { id: string; icon: string; title: string; description: string; }

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {services.map((service, i) => {
        const Icon = iconMap[service.icon] ?? Monitor;
        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="group p-6 rounded-2xl border transition-all duration-300"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)";
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
              style={{ backgroundColor: "var(--accent-muted)" }}
            >
              <Icon size={20} style={{ color: "var(--accent)" }} />
            </div>
            <h3
              className="font-bold text-base mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              {service.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {service.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
