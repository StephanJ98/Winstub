import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get the directory of this config file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load only the monorepo root .env
dotenv.config({ path: resolve(__dirname, '../../.env'), override: true });

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/auth", "@repo/database"],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://apis.google.com",
              "style-src 'self' 'unsafe-inline' https://accounts.google.com",
              "img-src 'self' data: https://*.googleusercontent.com https://accounts.google.com",
              "connect-src 'self' https://accounts.google.com https://play.google.com https://apis.google.com",
              "frame-src 'self' https://accounts.google.com",
              "font-src 'self' data:"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig;