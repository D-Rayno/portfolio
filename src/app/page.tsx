import data from "@/data/portfolio.json";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import Timeline from "@/components/ui/Timeline";
import AnimatedSection from "@/components/AnimatedSection";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20 space-y-32">
      {/* Hero Section */}
      <AnimatedSection>
        <h1 className="text-6xl font-black tracking-tighter mb-4">{data.personal.name}</h1>
        <p className="text-2xl text-neutral-500 mb-8">{data.personal.tagline}</p>
        <Button href={`mailto:${data.personal.email}`}>
          <Mail size={18} /> Let&apos;s Talk
        </Button>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection>
        <h2 className="text-3xl font-bold mb-12">Experience</h2>
        <Timeline items={data.experience} />
      </AnimatedSection>

      {/* Projects Grid */}
      <AnimatedSection>
        <h2 className="text-3xl font-bold mb-12">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </AnimatedSection>
    </main>
  );
}