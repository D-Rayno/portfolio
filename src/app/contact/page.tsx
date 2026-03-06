"use client";

import { useState } from "react";
import data from "@/data/portfolio.json";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle } from "lucide-react";

function GitLabIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z"/>
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 grain">
      <AnimatedSection>
        <p
          className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
          style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
        >
          Get in touch
        </p>
        <h1
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
        >
          Contact
        </h1>
        <p className="text-lg max-w-xl mb-16" style={{ color: "var(--text-secondary)" }}>
          Have a project in mind or just want to say hello? Drop me a message — I usually respond within 24 hours.
        </p>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Form */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col items-center justify-center text-center py-20 rounded-2xl border"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 280, damping: 18 }}
                  >
                    <CheckCircle size={40} className="mb-4" style={{ color: "var(--accent)" }} />
                  </motion.div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                  >
                    Message sent!
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                    <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                  </div>
                  <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" />
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs font-semibold tracking-wide uppercase"
                      style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-display)" }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl border text-sm resize-none outline-none transition-all duration-200"
                      style={{
                        backgroundColor: "var(--bg-surface)",
                        borderColor: "var(--border)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="self-start flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "#fff",
                      opacity: loading ? 0.75 : 1,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {loading ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <Send size={15} />
                    )}
                    {loading ? "Sending…" : "Send message"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="p-6 rounded-2xl border"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <h3
                className="font-bold mb-5"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                Other ways to reach me
              </h3>
              <div className="flex flex-col gap-4">
                <ContactLink icon={<Mail size={16} />} label={data.personal.email} href={`mailto:${data.personal.email}`} />
                <ContactLink icon={<Github size={16} />} label="GitHub" href={data.personal.github} />
                {data.personal.gitlab && (
                  <ContactLink icon={<GitLabIcon size={16} />} label="GitLab" href={data.personal.gitlab} />
                )}
                <ContactLink icon={<Linkedin size={16} />} label="LinkedIn" href={data.personal.linkedin} />
                <ContactLink icon={<MapPin size={16} />} label={data.personal.location} href="#" />
              </div>
            </motion.div>

            {data.personal.available && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="p-5 rounded-2xl border flex items-start gap-3"
                style={{ backgroundColor: "var(--accent-muted)", borderColor: "var(--accent-border)" }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 animate-pulse"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
                  >
                    {data.personal.availableText}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    I&apos;m actively looking for new projects and collaborations.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}

function Field({
  label, name, value, onChange, placeholder, type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-semibold tracking-wide uppercase"
        style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-display)" }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      />
    </div>
  );
}

function ContactLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-sm"
      style={{ color: "var(--text-secondary)" }}
      whileHover={{ x: 4, color: "var(--accent)" } as object}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span style={{ color: "var(--accent)" }}>{icon}</span>
      {label}
    </motion.a>
  );
}
