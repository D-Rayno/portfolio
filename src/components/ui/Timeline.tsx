"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Experience } from "@/types";

export default function Timeline({ items }: { items: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 75%", "end 65%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto py-4">
      {/* Track */}
      <div className="absolute left-5.5 top-0 bottom-0 w-px" style={{ backgroundColor: "var(--border)" }} />
      {/* Fill */}
      <motion.div
        className="absolute left-5.5 top-0 bottom-0 w-px z-10"
        style={{ scaleY, originY: 0, backgroundColor: "var(--accent)" }}
      />
      <div className="space-y-14">
        {items.map((item, index) => <TimelineItem key={item.id} item={item} index={index} />)}
      </div>
    </div>
  );
}

function TimelineItem({ item, index }: { item: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 50%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-16, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, x }} className="relative pl-14 group">
      <div
        className="absolute left-0 top-1 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.backgroundColor = "var(--accent-muted)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.backgroundColor = "var(--bg)";
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 + 0.1, type: "spring", stiffness: 300 }}
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: "var(--text-tertiary)" }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}>
          {item.period}
        </span>
        <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
          {item.role}
        </h3>
        <p className="text-sm font-medium mb-3" style={{ color: "var(--text-tertiary)" }}>{item.company}</p>

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="p-5 rounded-2xl border transition-all duration-300"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)"; }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
