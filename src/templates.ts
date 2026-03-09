import { ProjectConfig, TemplateFile } from "./types.js";

// ─── React Templates ───────────────────────────────────────────────

function reactTemplates(config: ProjectConfig): TemplateFile[] {
  const files: TemplateFile[] = [];

  files.push({
    path: "client/package.json",
    content: JSON.stringify(
      {
        name: `${config.projectName}-client`,
        version: "0.1.0",
        private: true,
        scripts: {
          dev: "vite",
          build: "tsc && vite build",
          preview: "vite preview",
        },
        dependencies: {
          react: "^18.2.0",
          "react-dom": "^18.2.0",
        },
        devDependencies: {
          "@types/react": "^18.2.0",
          "@types/react-dom": "^18.2.0",
          "@vitejs/plugin-react": "^4.2.0",
          typescript: "^5.4.0",
          vite: "^5.1.0",
        },
      },
      null,
      2
    ),
  });

  files.push({
    path: "client/tsconfig.json",
    content: JSON.stringify(
      {
        compilerOptions: {
          target: "ES2020",
          useDefineForClassFields: true,
          lib: ["ES2020", "DOM", "DOM.Iterable"],
          module: "ESNext",
          skipLibCheck: true,
          moduleResolution: "bundler",
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: "react-jsx",
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
        },
        include: ["src"],
      },
      null,
      2
    ),
  });

  files.push({
    path: "client/vite.config.ts",
    content: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:${config.backend === "express" ? "4000" : "8000"}",
        changeOrigin: true,
      },
    },
  },
});
`,
  });

  files.push({
    path: "client/index.html",
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${config.projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
  });

  files.push({
    path: "client/src/main.tsx",
    content: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
  });

  files.push({
    path: "client/src/App.tsx",
    content: `import { useState, useEffect } from "react";

interface HealthResponse {
  status: string;
  message: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => console.error("API not reachable:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>${config.projectName}</h1>
      <p>Your full-stack app is ready. Start building.</p>
      {health ? (
        <p style={{ color: "green" }}>API Status: {health.status} - {health.message}</p>
      ) : (
        <p style={{ color: "gray" }}>Connecting to API...</p>
      )}
    </div>
  );
}

export default App;
`,
  });

  files.push({
    path: "client/src/index.css",
    content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  background: #fafafa;
}
`,
  });

  return files;
}

// ─── Vue Templates ─────────────────────────────────────────────────

function vueTemplates(config: ProjectConfig): TemplateFile[] {
  const files: TemplateFile[] = [];

  files.push({
    path: "client/package.json",
    content: JSON.stringify(
      {
        name: `${config.projectName}-client`,
        version: "0.1.0",
        private: true,
        scripts: {
          dev: "vite",
          build: "vue-tsc && vite build",
          preview: "vite preview",
        },
        dependencies: {
          vue: "^3.4.0",
        },
        devDependencies: {
          "@vitejs/plugin-vue": "^5.0.0",
          typescript: "^5.4.0",
          "vue-tsc": "^2.0.0",
          vite: "^5.1.0",
        },
      },
      null,
      2
    ),
  });

  files.push({
    path: "client/vite.config.ts",
    content: `import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:${config.backend === "express" ? "4000" : "8000"}",
        changeOrigin: true,
      },
    },
  },
});
`,
  });

  files.push({
    path: "client/src/main.ts",
    content: `import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
`,
  });

  files.push({
    path: "client/src/App.vue",
    content: `<script setup lang="ts">
import { ref, onMounted } from "vue";

interface HealthResponse {
  status: string;
  message: string;
}

const health = ref<HealthResponse | null>(null);

onMounted(async () => {
  try {
    const res = await fetch("/api/health");
    health.value = await res.json();
  } catch (err) {
    console.error("API not reachable:", err);
  }
});
</script>

<template>
  <div style="padding: 2rem; font-family: system-ui, sans-serif">
    <h1>${config.projectName}</h1>
    <p>Your full-stack app is ready. Start building.</p>
    <p v-if="health" style="color: green">
      API Status: {{ health.status }} - {{ health.message }}
    </p>
    <p v-else style="color: gray">Connecting to API...</p>
  </div>
</template>
`,
  });

  files.push({
    path: "client/index.html",
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${config.projectName}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
  });

  return files;
}

// ─── Express Templates ─────────────────────────────────────────────

function expressTemplates(config: ProjectConfig): TemplateFile[] {
  const files: TemplateFile[] = [];

  files.push({
    path: "server/package.json",
    content: JSON.stringify(
      {
        name: `${config.projectName}-server`,
        version: "0.1.0",
        private: true,
        scripts: {
          dev: "ts-node-dev --respawn src/index.ts",
          build: "tsc",
          start: "node dist/index.js",
        },
        dependencies: {
          express: "^4.18.0",
          cors: "^2.8.5",
          dotenv: "^16.4.0",
          ...(config.database === "postgresql" ? { pg: "^8.11.0" } : {}),
          ...(config.database === "mongodb" ? { mongoose: "^8.1.0" } : {}),
        },
        devDependencies: {
          "@types/express": "^4.17.0",
          "@types/cors": "^2.8.0",
          "@types/node": "^20.11.0",
          typescript: "^5.4.0",
          "ts-node-dev": "^2.0.0",
        },
      },
      null,
      2
    ),
  });

  files.push({
    path: "server/tsconfig.json",
    content: JSON.stringify(
      {
        compilerOptions: {
          target: "ES2020",
          module: "commonjs",
          lib: ["ES2020"],
          outDir: "./dist",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true,
          declaration: true,
          sourceMap: true,
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "dist"],
      },
      null,
      2
    ),
  });

  let dbImport = "";
  let dbInit = "";

  if (config.database === "postgresql") {
    dbImport = `import { Pool } from "pg";\n`;
    dbInit = `
// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/${config.projectName}",
});

pool.query("SELECT NOW()")
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

export { pool };
`;
  } else if (config.database === "mongodb") {
    dbImport = `import mongoose from "mongoose";\n`;
    dbInit = `
// Database connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/${config.projectName}";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
`;
  }

  files.push({
    path: "server/src/index.ts",
    content: `import express from "express";
import cors from "cors";
import dotenv from "dotenv";
${dbImport}
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// TODO: Add your routes here
// app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
${dbInit}
export default app;
`,
  });

  return files;
}

// ─── FastAPI Templates ─────────────────────────────────────────────

function fastapiTemplates(config: ProjectConfig): TemplateFile[] {
  const files: TemplateFile[] = [];

  let dbImport = "";
  let dbCode = "";

  if (config.database === "postgresql") {
    dbImport = `import psycopg2
import os`;
    dbCode = `

# Database connection
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/${config.projectName}")

def get_db():
    conn = psycopg2.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        conn.close()
`;
  } else if (config.database === "mongodb") {
    dbImport = `from pymongo import MongoClient
import os`;
    dbCode = `

# Database connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["${config.projectName}"]
`;
  }

  files.push({
    path: "server/main.py",
    content: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
${dbImport}

app = FastAPI(title="${config.projectName}")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Server is running"}

# TODO: Add your routes here
# @app.get("/api/users")
# def get_users():
#     return []
${dbCode}
`,
  });

  const dbDeps =
    config.database === "postgresql"
      ? "\npsycopg2-binary>=2.9.0"
      : config.database === "mongodb"
      ? "\npymongo>=4.6.0"
      : "";

  files.push({
    path: "server/requirements.txt",
    content: `fastapi>=0.109.0
uvicorn[standard]>=0.27.0
python-dotenv>=1.0.0${dbDeps}
`,
  });

  return files;
}

// ─── Docker Templates ──────────────────────────────────────────────

function dockerTemplates(config: ProjectConfig): TemplateFile[] {
  const files: TemplateFile[] = [];
  const services: string[] = [];

  // Database service
  if (config.database === "postgresql") {
    services.push(`  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${config.projectName}
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data`);
  } else if (config.database === "mongodb") {
    services.push(`  db:
    image: mongo:7
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongodata:/data/db`);
  }

  // Backend service
  if (config.backend === "express") {
    services.push(`  server:
    build: ./server
    restart: unless-stopped
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=development${
        config.database === "postgresql"
          ? "\n      - DATABASE_URL=postgresql://postgres:postgres@db:5432/" + config.projectName
          : config.database === "mongodb"
          ? "\n      - MONGO_URI=mongodb://db:27017/" + config.projectName
          : ""
      }${config.database !== "none" ? "\n    depends_on:\n      - db" : ""}`);

    files.push({
      path: "server/Dockerfile",
      content: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
`,
    });
  } else if (config.backend === "fastapi") {
    services.push(`  server:
    build: ./server
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - ENVIRONMENT=development${
        config.database === "postgresql"
          ? "\n      - DATABASE_URL=postgresql://postgres:postgres@db:5432/" + config.projectName
          : config.database === "mongodb"
          ? "\n      - MONGO_URI=mongodb://db:27017/" + config.projectName
          : ""
      }${config.database !== "none" ? "\n    depends_on:\n      - db" : ""}`);

    files.push({
      path: "server/Dockerfile",
      content: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
`,
    });
  }

  // Frontend service
  if (config.frontend !== "none") {
    services.push(`  client:
    build: ./client
    restart: unless-stopped
    ports:
      - "3000:3000"
    depends_on:
      - server`);

    files.push({
      path: "client/Dockerfile",
      content: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]
`,
    });
  }

  // Volumes
  const volumes: string[] = [];
  if (config.database === "postgresql") volumes.push("  pgdata:");
  if (config.database === "mongodb") volumes.push("  mongodata:");

  files.push({
    path: "docker-compose.yml",
    content: `version: "3.8"

services:
${services.join("\n\n")}
${volumes.length > 0 ? "\nvolumes:\n" + volumes.join("\n") : ""}
`,
  });

  return files;
}

// ─── Common Files ──────────────────────────────────────────────────

function commonTemplates(config: ProjectConfig): TemplateFile[] {
  const files: TemplateFile[] = [];

  // .gitignore
  const ignoreLines = [
    "node_modules/",
    "dist/",
    ".env",
    ".env.local",
    "*.log",
    ".DS_Store",
    "__pycache__/",
    "*.pyc",
    ".venv/",
  ];
  files.push({
    path: ".gitignore",
    content: ignoreLines.join("\n") + "\n",
  });

  // .env.example
  const envLines: string[] = ["# Environment variables", "NODE_ENV=development"];
  if (config.database === "postgresql") {
    envLines.push(
      `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/${config.projectName}`
    );
  }
  if (config.database === "mongodb") {
    envLines.push(`MONGO_URI=mongodb://localhost:27017/${config.projectName}`);
  }
  files.push({
    path: ".env.example",
    content: envLines.join("\n") + "\n",
  });

  // README
  const frontendLabel =
    config.frontend === "react"
      ? "React (TypeScript)"
      : config.frontend === "vue"
      ? "Vue (TypeScript)"
      : null;

  const backendLabel =
    config.backend === "express"
      ? "Express (TypeScript)"
      : config.backend === "fastapi"
      ? "FastAPI (Python)"
      : null;

  const stackParts: string[] = [];
  if (frontendLabel) stackParts.push(frontendLabel);
  if (backendLabel) stackParts.push(backendLabel);
  if (config.database !== "none") stackParts.push(config.database === "postgresql" ? "PostgreSQL" : "MongoDB");
  if (config.includeDocker) stackParts.push("Docker");

  let setupSteps = "";

  if (config.includeDocker) {
    setupSteps += `### With Docker

\`\`\`bash
docker-compose up
\`\`\`

This starts all services. Frontend at http://localhost:3000, API at http://localhost:${
      config.backend === "express" ? "4000" : "8000"
    }.

### Without Docker

`;
  }

  if (config.frontend !== "none") {
    setupSteps += `#### Frontend

\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

`;
  }

  if (config.backend === "express") {
    setupSteps += `#### Backend

\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

`;
  } else if (config.backend === "fastapi") {
    setupSteps += `#### Backend

\`\`\`bash
cd server
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
\`\`\`

`;
  }

  files.push({
    path: "README.md",
    content: `# ${config.projectName}

${stackParts.length > 0 ? `**Stack:** ${stackParts.join(" + ")}` : ""}

## Getting Started

\`\`\`bash
cp .env.example .env
\`\`\`

${setupSteps}
## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/health | Health check |

## Project Structure

\`\`\`
${config.projectName}/
${config.frontend !== "none" ? "├── client/          # Frontend application\n" : ""}${
      config.backend !== "none" ? "├── server/          # Backend application\n" : ""
    }${config.includeDocker ? "├── docker-compose.yml\n" : ""}├── .env.example
├── .gitignore
└── README.md
\`\`\`

## License

MIT
`,
  });

  return files;
}

// ─── Main Generator ────────────────────────────────────────────────

export function generateTemplates(config: ProjectConfig): TemplateFile[] {
  const files: TemplateFile[] = [];

  // Common files
  files.push(...commonTemplates(config));

  // Frontend
  if (config.frontend === "react") files.push(...reactTemplates(config));
  if (config.frontend === "vue") files.push(...vueTemplates(config));

  // Backend
  if (config.backend === "express") files.push(...expressTemplates(config));
  if (config.backend === "fastapi") files.push(...fastapiTemplates(config));

  // Docker
  if (config.includeDocker) files.push(...dockerTemplates(config));

  return files;
}
