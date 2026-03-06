"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Chip from "./Chip";

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
}: Project) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative bg-surface border border-neutral-200 p-7 rounded-2xl cursor-default overflow-hidden"
    >
      {/* Spotlight glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(91,92,246,0.07) 0%, transparent 65%)`
          ),
        }}
      />

      {/* Animated border on hover */}
      <div className="absolute inset-0 rounded-2xl border border-accent/0 group-hover:border-accent/20 transition-all duration-300" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3
            className="text-xl font-bold text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>
          <motion.a
            href={link}
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-accent hover:text-white transition-colors duration-200"
          >
            <ArrowUpRight size={18} />
          </motion.a>
        </div>

        <p className="text-neutral-500 mb-6 leading-relaxed text-sm line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <Chip label={tech} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
