export interface PackageManagerInfo {
  engine: 'npm' | 'pnpm' | 'yarn' | 'bun';
  nodeVersion: string;
  engineVersion: string;
}

const parseUserAgent = (userAgent: string) => {
  // Extract engine/version from patterns like "pnpm/8.6.12" or "npm/10.0.0"
  const match = userAgent.match(/^(\w+)\/([^\s]+)/);
  return match ? { engine: match[1], version: match[2] } : null;
};

/**
 * Detect the package manager engine and versions
 */
export default function detectPackageManager(): PackageManagerInfo {
  const nodeVersion = process.version;
  const userAgent = process.env.npm_config_user_agent || "";
  
  // Try to parse engine and version from user agent
  const parsed = parseUserAgent(userAgent);
  
  let engine: string;
  let engineVersion: string;
  
  if (parsed) {
    engine = parsed.engine;
    engineVersion = parsed.version;
  } else {
    // Fallback to detection without version info
    if (userAgent.startsWith("pnpm")) engine = "pnpm";
    else if (userAgent.startsWith("yarn")) engine = "yarn";
    else if (userAgent.startsWith("bun")) engine = "bun";
    else engine = "npm";
    
    engineVersion = 'unknown';
  }
  
  return {
    engine: engine as PackageManagerInfo['engine'],
    nodeVersion,
    engineVersion
  };
}