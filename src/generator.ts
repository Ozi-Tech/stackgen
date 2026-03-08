import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { ProjectConfig, TemplateFile } from "./types";

export function writeFiles(projectDir: string, files: TemplateFile[]): void {
  for (const file of files) {
    const filePath = path.join(projectDir, file.path);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, file.content, "utf-8");
  }
}

export function initGitRepo(projectDir: string): boolean {
  try {
    execSync("git init", { cwd: projectDir, stdio: "ignore" });
    execSync("git add -A", { cwd: projectDir, stdio: "ignore" });
    execSync('git commit -m "Initial commit from stackgen"', {
      cwd: projectDir,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

export function createProjectDir(projectName: string): string {
  const projectDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    const contents = fs.readdirSync(projectDir);
    if (contents.length > 0) {
      throw new Error(
        `Directory "${projectName}" already exists and is not empty.`
      );
    }
  } else {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  return projectDir;
}
