import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: [
    "@anthropic-ai/sdk",
    "@modelcontextprotocol/sdk",
    "tsx"
  ],
  turbopack: {
    root: repoRoot
  }
};

export default nextConfig;
