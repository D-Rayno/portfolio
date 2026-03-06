import data from "@/data/portfolio.json";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import Timeline from "@/components/ui/Timeline";
import AnimatedSection from "@/components/AnimatedSection";
import HeroSection from "@/components/HeroSection";
import SkillsStrip from "@/components/SkillsStrip";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-24 space-y-36 grain">
      {/* Hero */}
      <HeroSection personal={data.personal} />

      {/* Skills */}
      <AnimatedSection delay={0.1}>
        <SkillsStrip skills={data.skills} />
      </AnimatedSection>

      {/* Experience */}
      <AnimatedSection>
        <div className="flex items-baseline gap-4 mb-14">
          <h2
            className="text-4xl font-extrabold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Experience
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <Timeline items={data.experience} />
      </AnimatedSection>

      {/* Projects */}
      <AnimatedSection>
        <div className="flex items-baseline gap-4 mb-14">
          <h2
            className="text-4xl font-extrabold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Projects
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </AnimatedSection>

      {/* CTA Footer */}
      <AnimatedSection>
        <div className="text-center py-16 border-t border-neutral-200">
          <p
            className="text-5xl font-extrabold mb-6 text-neutral-900 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s build
            <br />
            <span className="text-accent">something great.</span>
          </p>
          <p className="text-neutral-400 mb-8 text-base max-w-sm mx-auto">
            Open to freelance projects, full-time roles, and interesting collaborations.
          </p>
          <Button href={`mailto:${data.personal.email}`} variant="primary">
            <Mail size={16} />
            Get in touch
          </Button>
        </div>
      </AnimatedSection>
    </main>
  );
}
