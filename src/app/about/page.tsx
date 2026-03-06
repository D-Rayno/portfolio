"use client";

import data from "@/data/portfolio.json";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { MapPin, Sparkles, BookOpen, Zap } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-24 grain">

      {/* Header */}
      <AnimatedSection>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={13} style={{ color: "var(--accent)" }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-tertiary)" }}>
                {data.personal.location}
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              Hey, I&apos;m Rayan.
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
              {data.personal.bio}
            </p>
            <Button href="/contact" variant="primary">Let&apos;s work together</Button>
          </div>

          {/* Avatar placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square max-w-xs mx-auto md:mx-0 rounded-3xl border overflow-hidden"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-elevated)" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ color: "var(--text-tertiary)" }}>
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold"
                style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)", fontFamily: "var(--font-display)" }}
              >
                RZE
              </div>
              <span className="text-xs tracking-widest uppercase">Photo coming soon</span>
            </div>
            {/* Decorative corner accent */}
            <div
              className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full"
              style={{ backgroundColor: "var(--accent-muted)" }}
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Long bio */}
      <AnimatedSection>
        <div className="max-w-2xl">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            My story
          </h2>
          {data.personal.bioLong.split("\n\n").map((para, i) => (
            <p key={i} className="mb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {para}
            </p>
          ))}
        </div>
      </AnimatedSection>

      {/* Skills by category */}
      <AnimatedSection>
        <h2
          className="text-3xl font-extrabold mb-10"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
        >
          Skills & Tools
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.skillsByCategory.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="p-5 rounded-2xl border"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <h3
                className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
                style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
              >
                {cat.category}
              </h3>
              <div className="flex flex-col gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Extras: hobbies + currently learning */}
      <AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
            <Sparkles size={18} className="mb-4" style={{ color: "var(--accent)" }} />
            <h3 className="font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>Interests</h3>
            <ul className="flex flex-col gap-1.5">
              {data.about.hobbies.map((h) => (
                <li key={h} className="text-sm" style={{ color: "var(--text-secondary)" }}>— {h}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
            <Zap size={18} className="mb-4" style={{ color: "var(--accent)" }} />
            <h3 className="font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>Currently Learning</h3>
            <ul className="flex flex-col gap-1.5">
              {data.about.currentlyLearning.map((h) => (
                <li key={h} className="text-sm" style={{ color: "var(--text-secondary)" }}>— {h}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
            <BookOpen size={18} className="mb-4" style={{ color: "var(--accent)" }} />
            <h3 className="font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>Philosophy</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {data.about.passion}
            </p>
          </div>
        </div>
      </AnimatedSection>

    </main>
  );
}
