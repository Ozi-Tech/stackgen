export interface ProjectConfig {
  projectName: string;
  frontend: "react" | "vue" | "none";
  backend: "express" | "fastapi" | "none";
  database: "postgresql" | "mongodb" | "none";
  includeDocker: boolean;
  initGit: boolean;
}

export interface TemplateFile {
  path: string;
  content: string;
}
