"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 border-b"
            : "py-5"
        }`}
        style={{
          backgroundColor: scrolled ? "var(--bg-surface)" : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.6)" : "none",
        }}
      >
        <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-extrabold text-lg tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
            RZE<span style={{ color: "var(--accent)" }}>.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    active ? "" : "hover:bg-elevated"
                  }`}
                  style={{ color: active ? "var(--accent)" : "var(--text-secondary)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: "var(--accent-muted)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 flex items-center justify-center rounded-xl border transition-colors duration-200"
              style={{
                backgroundColor: "var(--bg-elevated)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              onClick={() => setMenuOpen((v) => !v)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border"
              style={{
                backgroundColor: "var(--bg-elevated)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden border-b px-6 py-4"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      color: active ? "var(--accent)" : "var(--text-secondary)",
                      backgroundColor: active ? "var(--accent-muted)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
