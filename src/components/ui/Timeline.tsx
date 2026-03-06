"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Experience } from "@/types";

export default function Timeline({ items }: { items: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 65%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto py-4">
      {/* Track line */}
      <div className="absolute left-5.5 top-0 bottom-0 w-px bg-neutral-200" />

      {/* Animated fill line */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute left-5.5 top-0 bottom-0 w-px bg-accent z-10"
      />

      <div className="space-y-14">
        {items.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ item, index }: { item: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 50%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-16, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className="relative pl-14 group"
    >
      {/* Dot node */}
      <div className="absolute left-0 top-1 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-background border-2 border-neutral-200 group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 + 0.1, type: "spring", stiffness: 300 }}
          className="w-2.5 h-2.5 rounded-full bg-neutral-300 group-hover:bg-accent transition-colors duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <span
          className="text-xs font-bold tracking-[0.2em] text-accent uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {item.period}
        </span>

        <h3
          className="text-xl font-bold text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {item.role}
        </h3>

        <p className="text-sm font-medium text-neutral-400 mb-3">
          {item.company}
        </p>

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-surface border border-neutral-100 p-5 rounded-2xl shadow-subtle group-hover:shadow-float group-hover:border-neutral-200 transition-all duration-300"
        >
          <p className="text-neutral-500 leading-relaxed text-sm">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
