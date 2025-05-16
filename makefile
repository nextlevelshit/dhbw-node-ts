.PHONY: up down restart build logs shell test clean prod prod-down help

# Default target
help:
	@echo "Usage:"
	@echo "  make up        - Start the development environment"
	@echo "  make down      - Stop the development environment"
	@echo "  make restart   - Restart the development environment"
	@echo "  make build     - Rebuild the Docker images"
	@echo "  make logs      - Show logs"
	@echo "  make shell     - Open a shell in the running container"
	@echo "  make test      - Run tests"
	@echo "  make clean     - Remove all containers, images, and volumes"
	@echo "  make prod      - Start the production environment"
	@echo "  make prod-down - Stop the production environment"

# Start the application
up:
	docker compose up

# Stop the application
down:
	docker compose down

# Restart the application
restart:
	docker compose restart --remove-orphans --force-recreate

# Build the application
build:
	docker compose build

# Show logs
logs:
	docker compose logs -f

# Open a shell in the running container
shell:
	docker compose exec app /bin/sh

# Run tests in the container
test:
	docker compose exec app npm test

# Clean up everything
clean:
	docker compose down --rmi all --volumes --remove-orphans

# Start production environment
prod:
	docker compose -f compose.prod.yml up

# Stop production environment
prod-down:
	docker compose -f compose.prod.yml down