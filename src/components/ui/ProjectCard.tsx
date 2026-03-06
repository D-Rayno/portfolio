import { Project } from "@/types";
import { ExternalLink, Github } from "lucide-react";
import Chip from "./Chip";

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
}: Project) {
  return (
    <div className="group bg-white border border-neutral-200 p-6 rounded-2xl transition-all duration-300 hover:shadow-float hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
          {title}
        </h3>
        <a href={link} className="text-neutral-400 hover:text-primary">
          <ExternalLink size={20} />
        </a>
      </div>
      <p className="text-neutral-600 mb-6 line-clamp-2">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Chip key={tech} label={tech} />
        ))}
      </div>
    </div>
  );
}
