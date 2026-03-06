import data from "@/data/portfolio.json";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import Timeline from "@/components/ui/Timeline";
import AnimatedSection from "@/components/AnimatedSection";
import HeroSection from "@/components/HeroSection";
import SkillsStrip from "@/components/SkillsStrip";
import StatsBar from "@/components/StatsBar";
import ServicesGrid from "@/components/ServicesGrid";
import Testimonials from "@/components/Testimonials";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredProjects = data.projects.filter((p) => p.featured);

  return (
    <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-36 grain">
      <HeroSection personal={data.personal} />

      <AnimatedSection delay={0.05}>
        <StatsBar stats={data.stats} />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <SkillsStrip skills={data.skills} />
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="Services" />
        <ServicesGrid services={data.services} />
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="Experience" />
        <Timeline items={data.experience} />
      </AnimatedSection>

      <AnimatedSection>
        <div className="flex items-center justify-between mb-14">
          <h2 className="text-4xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
            Featured Projects
          </h2>
          <Link href="/projects" className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--accent)" }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title="Kind Words" />
        <Testimonials items={data.testimonials} />
      </AnimatedSection>

      <AnimatedSection>
        <div
          className="text-center py-20 px-8 rounded-3xl border relative overflow-hidden"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: "var(--accent-muted)", opacity: 0.8 }}
          />
          <div className="relative z-10">
            <p className="text-5xl font-extrabold mb-5 leading-tight" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
              Let&apos;s build<br />
              <span style={{ color: "var(--accent)" }}>something great.</span>
            </p>
            <p className="mb-8 text-base max-w-sm mx-auto" style={{ color: "var(--text-secondary)" }}>
              Open to freelance projects, full-time roles, and interesting collaborations.
            </p>
            <Button href="/contact" variant="primary">
              Get in touch <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-14">
      <h2 className="text-4xl font-extrabold whitespace-nowrap" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
    </div>
  );
}
