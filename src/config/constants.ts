// Constants for the application
export const port = process.env.PORT ? parseInt(process.env.PORT) : 13_000;
export const isDevelopment = "production" !== process.env.NODE_ENV;
// Database configuration
export const databaseAddress = process.env.DATABASE_URL;
export const env = process.env.NODE_ENV ?? "development";
// Decorators
export const routesKey = Symbol("routes");
export const prefixKey = Symbol("prefix");
