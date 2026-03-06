export interface TechConfig {
  filename: string;
  color: string;
}

const techIcons: Record<string, TechConfig> = {
  "Vue JS": { filename: "vuejs.svg", color: "#4FC08D" },
  "React JS": { filename: "reactjs.svg", color: "#61DAFB" },
  "Next JS": { filename: "nextjs.svg", color: "#000000" },
  "Nuxt JS": { filename: "nuxtjs.svg", color: "#00DC82" },
  "React Native": { filename: "react-native.svg", color: "#61DAFB" },
  "Ionic & Capacitor": { filename: "ionic.svg", color: "#3880FF" },
  "Tauri": { filename: "tauri.svg", color: "#FFC131" },
  "Python": { filename: "python.svg", color: "#3776AB" },
  "Java": { filename: "java.svg", color: "#f89820" },
  "JavaScript & TypeScript": { filename: "typescript.svg", color: "#3178C6" },
  "Node JS": { filename: "nodejs.svg", color: "#5FA04E" },
  "Php": { filename: "php.svg", color: "#777BB4" },
  "Express JS": { filename: "expressjs.svg", color: "#888888" },
  "Laravel": { filename: "laravel.svg", color: "#FF2D20" },
  "Adonis JS": { filename: "adonisjs.svg", color: "#5A45FF" },
  "Supabase": { filename: "supabase.svg", color: "#3ECF8E" },
  "PostgreSQL": { filename: "postgresql.svg", color: "#4169E1" },
  "MySQL": { filename: "mysql.svg", color: "#4479A1" },
  "Tailwind CSS": { filename: "tailwind.svg", color: "#06B6D4" },
  "Docker": { filename: "docker.svg", color: "#2496ED" },
  "Strapi": { filename: "strapi.svg", color: "#2F2E8B" }
};

export default techIcons;