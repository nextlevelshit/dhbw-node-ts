FROM node:21.7.2-alpine AS base

WORKDIR /app

# Create a base with just package files for more efficient caching
COPY package*.json ./
RUN npm install

# Development stage
FROM base AS development
COPY . .
EXPOSE 1312

# Build stage
FROM base AS build
COPY . .
RUN npm run build

# Production stage
FROM base AS production
# Copy only what's needed from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/tsconfig.json ./
# Include entity files needed by TypeORM
COPY --from=build /app/src/entity ./src/entity

EXPOSE 1312
ENV NODE_ENV=production
CMD ["node", "./dist/index.js"]