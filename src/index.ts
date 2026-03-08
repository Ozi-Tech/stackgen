#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { promptUser } from "./prompts";
import { generateTemplates } from "./templates";
import { writeFiles, initGitRepo, createProjectDir } from "./generator";

const program = new Command();

program
  .name("stackgen")
  .description("Scaffold full-stack project boilerplates interactively")
  .version("1.0.0")
  .action(async () => {
    console.log(
      chalk.bold.cyan("\n  stackgen") +
        chalk.gray(" — scaffold your next project\n")
    );

    try {
      // Get user preferences
      const config = await promptUser();

      // Validate: at least one layer selected
      if (
        config.frontend === "none" &&
        config.backend === "none" &&
        config.database === "none"
      ) {
        console.log(
          chalk.yellow(
            "\n  You didn't select any stack layers. Nothing to generate.\n"
          )
        );
        return;
      }

      // Create project directory
      const projectDir = createProjectDir(config.projectName);

      // Generate template files
      const files = generateTemplates(config);

      // Write files to disk
      writeFiles(projectDir, files);

      console.log(
        chalk.green(`\n  Created ${files.length} files in ./${config.projectName}/`)
      );

      // Initialize git
      if (config.initGit) {
        const gitSuccess = initGitRepo(projectDir);
        if (gitSuccess) {
          console.log(chalk.green("  Initialized Git repository"));
        } else {
          console.log(
            chalk.yellow("  Could not initialize Git (is git installed?)")
          );
        }
      }

      // Print next steps
      console.log(chalk.bold("\n  Next steps:\n"));
      console.log(chalk.gray(`  cd ${config.projectName}`));

      if (config.includeDocker) {
        console.log(chalk.gray("  docker-compose up"));
      } else {
        if (config.frontend !== "none") {
          console.log(chalk.gray("  cd client && npm install && npm run dev"));
        }
        if (config.backend === "express") {
          console.log(chalk.gray("  cd server && npm install && npm run dev"));
        }
        if (config.backend === "fastapi") {
          console.log(
            chalk.gray(
              "  cd server && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn main:app --reload"
            )
          );
        }
      }

      console.log(chalk.bold.cyan("\n  Happy building!\n"));
    } catch (err) {
      if (err instanceof Error) {
        console.error(chalk.red(`\n  Error: ${err.message}\n`));
      }
      process.exit(1);
    }
  });

program.parse();
