# TypeScript (TS) + Object Relational Mapping (ORM)

A Node.js application using TypeScript and TypeORM.

## Local Development

### Prerequisites

- Node.js v21.7.2 (recommended to use nvm)
- npm

### Getting Started

1. Run `nvm use` (optional)
2. Run `npm i`
3. Run `npm start`
4. Run `npm start:prod` for production

### Testing

1. Run `npm test`
2. Run `npm run test:watch` to watch for changes

### Linting

1. Run `npm run lint` to check for linting errors
2. Run `npm run lint:fix` to fix linting errors

### Building

1. Run `npm run build` to build the project

### TypeORM

#### Create Entity

```bash
npm run typeorm entity:create src/entity/Entity
```

## Docker Development

This project includes Docker configurations for both development and production environments.

### Docker Prerequisites

- Docker
- Docker Compose

### Using Docker for Development

#### Start the Development Environment

```bash
make up
```

#### View Logs

```bash
make logs
```

#### Access Shell in Container

```bash
make shell
```

#### Run Tests in Container

```bash
make test
```

#### Stop the Environment

```bash
make down
```

#### Rebuild the Docker Image

```bash
make build
```

### Production Deployment

To build and run the application in production mode:

```bash
# Build the production image
docker compose -f compose.prod.yml build

# Run the production container
docker compose -f compose.prod.yml up -d
```

## Project Structure

```
.
├── src
│   ├── AppDataSource.ts     # TypeORM data source configuration
│   ├── App.ts               # Main application setup
│   ├── config/              # Application configuration
│   ├── controller/          # API controllers
│   ├── decorator/           # Custom decorators
│   ├── entity/              # TypeORM entities
│   ├── impl/                # Implementation classes
│   ├── index.ts             # Application entry point
│   └── io/                  # Interface definitions
├── babel.config.js          # Babel configuration
├── jest.config.ts           # Jest test configuration
├── tsconfig.json            # TypeScript configuration
├── compose.yaml             # Docker Compose development config
├── Dockerfile               # Multi-stage Docker build file
└── Makefile                 # Development utility commands
```

## Available Make Commands

| Command        | Description                                |
| -------------- | ------------------------------------------ |
| `make up`      | Start the development environment          |
| `make down`    | Stop the development environment           |
| `make restart` | Restart the development environment        |
| `make build`   | Rebuild the Docker images                  |
| `make logs`    | Show logs                                  |
| `make shell`   | Open a shell in the running container      |
| `make test`    | Run tests                                  |
| `make clean`   | Remove all containers, images, and volumes |
