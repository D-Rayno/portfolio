"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, MapPin, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

interface Personal {
  name: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  title: string;
}

const letterVariants = {
  hidden: { opacity: 0, y: 40, skewY: 4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      delay: i * 0.035,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function HeroSection({ personal }: { personal: Personal }) {
  const nameParts = personal.name.split(" ");

  return (
    <section className="min-h-[60vh] flex flex-col justify-center pt-8">
      {/* Location badge */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-1.5 text-neutral-400 text-xs font-medium mb-8 tracking-wide uppercase"
      >
        <MapPin size={12} />
        {personal.location}
      </motion.div>

      {/* Name — letter-by-letter reveal */}
      <h1
        className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none mb-6 overflow-hidden"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {nameParts.map((word, wi) => (
          <span key={wi} className="block overflow-hidden">
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                custom={wi * 6 + ci}
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="text-xl md:text-2xl text-neutral-400 font-light mb-10 max-w-xl leading-snug"
      >
        {personal.tagline}
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex items-center gap-3 flex-wrap"
      >
        <Button href={`mailto:${personal.email}`} variant="primary">
          <Mail size={15} />
          Get in touch
        </Button>

        <Button href={personal.github} variant="outline">
          <Github size={15} />
          GitHub
        </Button>

        <Button href={personal.linkedin} variant="outline">
          <Linkedin size={15} />
          LinkedIn
        </Button>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex items-center gap-2 mt-16 text-neutral-300"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-neutral-300 to-transparent"
        />
        <span className="text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
      </motion.div>
    </section>
  );
}
