export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
  };
  about: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
}
