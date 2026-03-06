"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Chip from "./Chip";

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97, filter: "blur(3px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function ProjectCard({ title, description, technologies, link }: Project) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // 3-D tilt
  const x  = useMotionValue(0);
  const y  = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 180, damping: 22 });
  const my = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["6deg",  "-6deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-6deg", "6deg"]);

  // Spotlight glow follows cursor
  const glowX = useTransform(mx, [-0.5, 0.5], ["0%",   "100%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["0%",   "100%"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width  - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  };

  const onLeave = () => {
    x.set(0); y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transition: "border-color 0.3s, box-shadow 0.35s",
        borderColor: hovered ? "var(--accent-border)" : "var(--border)",
        boxShadow:   hovered
          ? "0 24px 60px -12px rgba(91,92,246,0.18), var(--shadow-lg)"
          : "var(--shadow)",
        backgroundColor: "var(--bg-surface)",
      }}
      className="relative p-7 rounded-2xl border overflow-hidden cursor-default"
    >
      {/* Spotlight gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, var(--accent-muted) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Animated border flash on enter */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.6 }}
            style={{ border: "1.5px solid var(--accent)", borderRadius: "1rem" }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Header row */}
        <motion.div
          variants={childVariant}
          className="flex justify-between items-start mb-4"
        >
          <h3
            className="text-xl font-bold pr-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            {title}
          </h3>
          <motion.a
            href={link}
            whileHover={{ rotate: 45, scale: 1.15, backgroundColor: "var(--accent)", color: "#fff" }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200"
            style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-tertiary)" }}
          >
            <ArrowUpRight size={17} />
          </motion.a>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={childVariant}
          className="mb-6 leading-relaxed text-sm line-clamp-3"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </motion.p>

        {/* Tech chips */}
        <motion.div variants={childVariant} className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 300 }}
            >
              <Chip label={tech} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
