export interface PackageManagerInfo {
  engine: 'npm' | 'pnpm' | 'yarn' | 'bun';
  nodeVersion: string;
  engineVersion: string;
}

// Extract engine/version from patterns like "pnpm/8.6.12" or "npm/10.0.0"
const USER_AGENT_REGEX = /^(\w+)\/([^\s]+)/;

const parseUserAgent = (userAgent: string) => {
  const match = userAgent.match(USER_AGENT_REGEX);
  return match ? { engine: match[1], version: match[2] } : null;
};

/**
 * Detect the package manager engine and versions
 */

export default (): PackageManagerInfo => {
  const nodeVersion = process.version;
  const userAgent = process.env.npm_config_user_agent;
  const parsed = parseUserAgent(userAgent || '');
  return {
    engine: (parsed?.engine as PackageManagerInfo['engine']) || 'npm',
    nodeVersion,
    engineVersion: parsed?.version || 'unknown',
  };
}
