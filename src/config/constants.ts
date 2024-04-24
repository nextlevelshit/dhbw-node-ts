export const port = process.env.PORT ? parseInt(process.env.PORT) : 13_000;
export const isDevelopment = "production" !== process.env.NODE_ENV;
