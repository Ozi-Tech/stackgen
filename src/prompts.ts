import inquirer from "inquirer";
import { ProjectConfig } from "./types";

export async function promptUser(): Promise<ProjectConfig> {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-app",
      validate: (input: string) => {
        if (!/^[a-z0-9-]+$/.test(input)) {
          return "Project name must be lowercase letters, numbers, and hyphens only";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "frontend",
      message: "Frontend framework:",
      choices: [
        { name: "React (TypeScript)", value: "react" },
        { name: "Vue (TypeScript)", value: "vue" },
        { name: "None", value: "none" },
      ],
    },
    {
      type: "list",
      name: "backend",
      message: "Backend framework:",
      choices: [
        { name: "Express (TypeScript)", value: "express" },
        { name: "FastAPI (Python)", value: "fastapi" },
        { name: "None", value: "none" },
      ],
    },
    {
      type: "list",
      name: "database",
      message: "Database:",
      choices: [
        { name: "PostgreSQL", value: "postgresql" },
        { name: "MongoDB", value: "mongodb" },
        { name: "None", value: "none" },
      ],
    },
    {
      type: "confirm",
      name: "includeDocker",
      message: "Include Docker setup?",
      default: true,
    },
    {
      type: "confirm",
      name: "initGit",
      message: "Initialize Git repository?",
      default: true,
    },
  ]);

  return answers as ProjectConfig;
}
