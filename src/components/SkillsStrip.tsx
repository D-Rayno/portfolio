"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import techIcons from "@/data/techIcons";

// ─── SVG imports (relative to src/components/, so ../../public/assets/...) ──
import VueIcon            from "../../public/assets/tech-logos/vuejs.svg";
import ReactIcon          from "../../public/assets/tech-logos/reactjs.svg";
import NextIcon           from "../../public/assets/tech-logos/nextjs.svg";
import NuxtIcon           from "../../public/assets/tech-logos/nuxtjs.svg";
import ReactNativeIcon    from "../../public/assets/tech-logos/react-native.svg";
import IonicIcon          from "../../public/assets/tech-logos/ionic.svg";
import CapacitorIcon      from "../../public/assets/tech-logos/capacitor.svg";
import TauriIcon          from "../../public/assets/tech-logos/tauri.svg";
import PythonIcon         from "../../public/assets/tech-logos/python.svg";
import JavaIcon           from "../../public/assets/tech-logos/java.svg";
import TypeScriptIcon     from "../../public/assets/tech-logos/typescript.svg";
import NodeIcon           from "../../public/assets/tech-logos/nodejs.svg";
import PhpIcon            from "../../public/assets/tech-logos/php.svg";
import ExpressIcon        from "../../public/assets/tech-logos/expressjs.svg";
import LaravelIcon        from "../../public/assets/tech-logos/laravel.svg";
import AdonisIcon         from "../../public/assets/tech-logos/adonisjs.svg";
import SupabaseIcon       from "../../public/assets/tech-logos/supabase.svg";
import PostgreSQLIcon     from "../../public/assets/tech-logos/postgresql.svg";
import MySQLIcon          from "../../public/assets/tech-logos/mysql.svg";
import TailwindIcon       from "../../public/assets/tech-logos/tailwind.svg";
import DockerIcon         from "../../public/assets/tech-logos/docker.svg";
import OdooIcon           from "../../public/assets/tech-logos/odoo.svg";

type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const SVG_MAP: Record<string, SvgComponent> = {
  "vuejs.svg":        VueIcon         as SvgComponent,
  "reactjs.svg":      ReactIcon       as SvgComponent,
  "nextjs.svg":       NextIcon        as SvgComponent,
  "nuxtjs.svg":       NuxtIcon        as SvgComponent,
  "react-native.svg": ReactNativeIcon as SvgComponent,
  "ionic.svg":        IonicIcon       as SvgComponent,
  "capacitor.svg":    CapacitorIcon   as SvgComponent,
  "tauri.svg":        TauriIcon       as SvgComponent,
  "python.svg":       PythonIcon      as SvgComponent,
  "java.svg":         JavaIcon        as SvgComponent,
  "typescript.svg":   TypeScriptIcon  as SvgComponent,
  "nodejs.svg":       NodeIcon        as SvgComponent,
  "php.svg":          PhpIcon         as SvgComponent,
  "expressjs.svg":    ExpressIcon     as SvgComponent,
  "laravel.svg":      LaravelIcon     as SvgComponent,
  "adonisjs.svg":     AdonisIcon      as SvgComponent,
  "supabase.svg":     SupabaseIcon    as SvgComponent,
  "postgresql.svg":   PostgreSQLIcon  as SvgComponent,
  "mysql.svg":        MySQLIcon       as SvgComponent,
  "tailwind.svg":     TailwindIcon    as SvgComponent,
  "docker.svg":       DockerIcon      as SvgComponent,
  "odoo.svg":         OdooIcon        as SvgComponent
};

// ─── Animations ─────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.88, filter: "blur(5px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main component ──────────────────────────────────────────────────────────
interface Props { skills: string[] }

export default function SkillsStrip({ skills }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <div ref={containerRef}>
      <motion.p
        initial={{ opacity: 0, x: -12 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-xs font-bold tracking-[0.28em] uppercase mb-7"
        style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-display)" }}
      >
        Tech Stack
      </motion.p>

      <motion.div
        className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {skills.map((skill) => (
          <SkillCard key={skill} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Individual card ─────────────────────────────────────────────────────────
function SkillCard({ skill }: { skill: string }) {
  const config  = techIcons[skill];
  const SvgComp = config ? SVG_MAP[config.filename] : undefined;
  const color   = config?.color ?? "var(--accent)";

  const [hovered, setHovered] = useState(false);

  const cardRef  = useRef<HTMLDivElement>(null);
  const inView   = useInView(cardRef, { once: true, margin: "-40px" });
  const [didAppear, setDidAppear] = useState(false);
  useEffect(() => {
    if (inView && !didAppear) setDidAppear(true);
  }, [inView, didAppear]);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border cursor-default select-none overflow-visible"
      style={{
        backgroundColor: hovered ? `${color}10` : "var(--bg-surface)",
        borderColor:     hovered ? `${color}50` : "var(--border)",
        boxShadow: hovered
          ? `0 0 0 1px ${color}22, 0 8px 28px -6px ${color}28`
          : "0 1px 2px rgba(0,0,0,0.04)",
        transform: hovered
          ? "translateY(-5px) scale(1.035)"
          : "translateY(0) scale(1)",
        transition:
          "background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Radial glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${color}20 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* First-appear shimmer ring */}
      {didAppear && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.4, scale: 0.75 }}
          animate={{ opacity: 0, scale: 1.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ border: `1.5px solid ${color}`, borderRadius: "1rem" }}
        />
      )}

      {/* Icon */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        style={{ width: 36, height: 36 }}
        animate={hovered ? { scale: 1.18, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 22 }}
      >
        {SvgComp ? (
          <SvgComp
            width={36}
            height={36}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              filter: hovered ? "saturate(1.1)" : "saturate(0.8)",
              transition: "filter 0.25s ease",
            }}
          />
        ) : (
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: "var(--accent-muted)",
              color: "var(--accent)",
              fontFamily: "var(--font-display)",
            }}
          >
            {skill.slice(0, 2).toUpperCase()}
          </div>
        )}
      </motion.div>

      {/* Label */}
      <motion.span
        className="relative z-10 text-center leading-tight"
        animate={{ color: hovered ? color : "var(--text-tertiary)" }}
        transition={{ duration: 0.2 }}
        style={{
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.03em",
          fontFamily: "var(--font-display)",
          wordBreak: "break-word",
          lineHeight: 1.25,
        }}
      >
        {skill}
      </motion.span>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute -bottom-9 left-1/2 z-50 whitespace-nowrap pointer-events-none"
            style={{ x: "-50%" }}
            initial={{ opacity: 0, y: -4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{   opacity: 0, y: -4, scale: 0.9  }}
            transition={{ duration: 0.15 }}
          >
            <span
              className="px-2.5 py-1 rounded-lg text-xs font-semibold"
              style={{
                backgroundColor: "var(--bg-elevated)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-display)",
                boxShadow: "var(--shadow)",
                display: "inline-block",
              }}
            >
              {skill}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}