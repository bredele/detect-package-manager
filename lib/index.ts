import { execSync } from 'child_process';

export interface PackageManagerInfo {
  engine: 'npm' | 'pnpm' | 'yarn' | 'bun';
  nodeVersion: string;
  engineVersion: string;
}

const getPackageManager = (): string => {
  const userAgent = process.env.npm_config_user_agent || "";
  if (userAgent.startsWith("pnpm")) return "pnpm";
  if (userAgent.startsWith("yarn")) return "yarn";
  if (userAgent.startsWith("bun")) return "bun";
  return "npm";
};

/**
 * Detect the package manager engine and versions
 */
export default function detectPackageManager(): PackageManagerInfo {
  const nodeVersion = process.version;
  const engine = getPackageManager();
  
  let engineVersion = 'unknown';
  try {
    engineVersion = execSync(`${engine} --version`, { encoding: 'utf8' }).trim();
  } catch {
    // If version command fails, keep as 'unknown'
  }
  
  return {
    engine: engine as PackageManagerInfo['engine'],
    nodeVersion,
    engineVersion
  };
}