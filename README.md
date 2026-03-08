# stackgen

Interactive CLI tool that scaffolds full-stack project boilerplates. Pick your frontend, backend, database, and optional Docker setup — get a production-ready project structure in seconds.

## Install

```bash
npm install -g stackgen
```

## Usage

```bash
stackgen
```

You'll be prompted to choose:

| Option | Choices |
|--------|---------|
| **Project name** | Any lowercase name with hyphens |
| **Frontend** | React (TypeScript), Vue (TypeScript), None |
| **Backend** | Express (TypeScript), FastAPI (Python), None |
| **Database** | PostgreSQL, MongoDB, None |
| **Docker** | Yes / No |
| **Git init** | Yes / No |

## What You Get

Depending on your selections, stackgen generates:

- **Frontend**: Vite-powered app with TypeScript, proxy config for API calls, starter component with API health check
- **Backend**: Server with CORS, health endpoint, database connection boilerplate, environment config
- **Database**: Connection setup and environment variables pre-configured
- **Docker**: `docker-compose.yml` with all services, Dockerfiles, volume mounts
- **Common**: `.gitignore`, `.env.example`, `README.md` with setup instructions, initial git commit

## Example

```bash
$ stackgen

  stackgen — scaffold your next project

? Project name: my-saas-app
? Frontend framework: React (TypeScript)
? Backend framework: Express (TypeScript)
? Database: PostgreSQL
? Include Docker setup? Yes
? Initialize Git repository? Yes

  Created 15 files in ./my-saas-app/
  Initialized Git repository

  Next steps:

  cd my-saas-app
  docker-compose up

  Happy building!
```

Generated structure:

```
my-saas-app/
├── client/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
├── server/
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Stack Combinations

stackgen supports any combination of:

- **9 full-stack combos**: 3 frontends × 3 backends
- **3 database options**: PostgreSQL, MongoDB, or None
- **Docker**: optional for any combo

Each generated project includes proper wiring between layers (API proxy, database connection strings, Docker networking).

## Development

```bash
git clone https://github.com/ozi-tech/stackgen.git
cd stackgen
npm install
npm run dev
```

## Built With

- TypeScript
- Commander.js (CLI framework)
- Inquirer.js (interactive prompts)
- Chalk (terminal styling)

## License

MIT
