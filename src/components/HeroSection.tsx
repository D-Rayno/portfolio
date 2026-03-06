"use client";

import { motion, cubicBezier } from "framer-motion";
import { Github, Linkedin, MapPin, Mail, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface Personal {
  name: string; tagline: string; email: string;
  github: string; linkedin: string; location: string;
  title: string; available: boolean; availableText: string;
}

const letterVariants = {
  hidden: { opacity: 0, y: 40, skewY: 4 },
  visible: (i: number) => ({
    opacity: 1, y: 0, skewY: 0,
    transition: { delay: i * 0.03, duration: 0.45, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
  }),
};

export default function HeroSection({ personal }: { personal: Personal }) {
  const nameParts = personal.name.split(" ");

  return (
    <section className="min-h-[65vh] flex flex-col justify-center pt-4">
      {/* Top row: location + available badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="flex items-center gap-4 mb-8 flex-wrap"
      >
        <span className="flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase" style={{ color: "var(--text-tertiary)" }}>
          <MapPin size={11} /> {personal.location}
        </span>
        {personal.available && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border"
            style={{
              backgroundColor: "var(--accent-muted)",
              borderColor: "var(--accent-border)",
              color: "var(--accent)",
              fontFamily: "var(--font-display)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
            {personal.availableText}
          </motion.span>
        )}
      </motion.div>

      {/* Name */}
      <h1
        className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none mb-6"
        style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
      >
        {nameParts.map((word, wi) => (
          <span key={wi} className="block overflow-hidden">
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                custom={wi * 7 + ci}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-xl md:text-2xl font-light mb-10 max-w-xl leading-snug"
        style={{ color: "var(--text-secondary)" }}
      >
        {personal.tagline}
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="flex items-center gap-3 flex-wrap mb-6"
      >
        <Button href={`mailto:${personal.email}`} variant="primary">
          <Mail size={14} /> Get in touch
        </Button>
        <Button href="/about" variant="outline">
          About me <ArrowRight size={14} />
        </Button>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <a href={personal.github} className="flex items-center gap-1.5 text-xs font-medium transition-colors" style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
        >
          <Github size={14} /> GitHub
        </a>
        <span style={{ color: "var(--border)" }}>·</span>
        <a href={personal.linkedin} className="flex items-center gap-1.5 text-xs font-medium transition-colors" style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
        >
          <Linkedin size={14} /> LinkedIn
        </a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="flex items-center gap-2 mt-16"
        style={{ color: "var(--text-tertiary)" }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-linear-to-b from-current to-transparent"
        />
        <span className="text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
      </motion.div>
    </section>
  );
}
