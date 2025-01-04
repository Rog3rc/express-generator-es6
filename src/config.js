import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import dotEnv from 'dotenv';

// Global use
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// Env Config
const config = dotEnv.config({
  path: resolve(__dirname, '../.env.' + process.env.NODE_ENV),
});

// Add ur env variables here same u have in ur .env file
export const ENV = {
  PORT: config.parsed.PORT,
};
