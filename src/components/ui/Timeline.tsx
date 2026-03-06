"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Experience } from "@/types";
import { Briefcase } from "lucide-react";

export default function Timeline({ items }: { items: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"],
  });

  // Smooth out the scroll progress for the "fill" effect
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto py-10">
      {/* Background Line */}
      <div className="absolute left-5.25 top-0 bottom-0 w-0.5 bg-neutral-200" />

      {/* Animated Filling Line */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute left-5.25 top-0 bottom-0 w-0.5 bg-accent z-10"
      />

      <div className="space-y-16">
        {items.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ item, index }: { item: Experience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-14 group"
    >
      {/* Icon Node */}
      <div className="absolute left-0 top-1 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-background border-2 border-neutral-200 group-hover:border-accent transition-colors duration-300">
        <Briefcase
          size={18}
          className="text-neutral-500 group-hover:text-accent transition-colors"
        />
      </div>

      {/* Content Card */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
          {item.period}
        </span>
        <h3 className="text-xl font-bold text-primary">{item.role}</h3>
        <p className="text-md font-medium text-neutral-500 mb-2">
          {item.company}
        </p>

        <div className="bg-white border border-neutral-100 p-5 rounded-xl shadow-subtle group-hover:shadow-float transition-all duration-300">
          <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
