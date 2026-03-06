"use client";

import data from "@/data/portfolio.json";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function BlogPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 grain">
      <AnimatedSection>
        <p
          className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
          style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
        >
          Writing
        </p>
        <h1
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
        >
          Blog
        </h1>
        <p className="text-lg max-w-xl mb-16" style={{ color: "var(--text-secondary)" }}>
          Thoughts on frontend engineering, architecture, and the craft of building great software.
        </p>

        <div className="flex flex-col" style={{ borderTop: "1px solid var(--border)" }}>
          {data.blog.map((post, i) => (
            <ArticleRow key={post.id} post={post} index={i} />
          ))}
        </div>
      </AnimatedSection>
    </main>
  );
}

type BlogPost = typeof data.blog[0];

function ArticleRow({ post, index }: { post: BlogPost; index: number }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover="hover"
      className="group flex items-start justify-between gap-6 py-8"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-0.5 rounded-md"
              style={{
                backgroundColor: "var(--accent-muted)",
                color: "var(--accent)",
                fontFamily: "var(--font-display)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h2
          className="text-xl font-bold mb-2 transition-colors"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
        >
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
          <span>{date}</span>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {post.readTime}
          </span>
        </div>
      </div>

      <motion.div
        variants={{ hover: { rotate: 45, scale: 1.1 } }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-1"
        style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-tertiary)" }}
      >
        <ArrowUpRight size={16} />
      </motion.div>
    </motion.a>
  );
}
