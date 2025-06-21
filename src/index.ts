import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';

export interface PackageManagerInfo {
  engine: 'npm' | 'pnpm' | 'yarn' | 'bun' | 'unknown';
  nodeVersion: string;
  engineVersion: string;
}

/**
 * Detect the package manager engine and versions
 */
export default function detectPackageManager(cwd: string = process.cwd()): PackageManagerInfo {
  const nodeVersion = process.version;
  
  // Try to detect engine from lock files
  let engine = detectEngineFromLockFiles(cwd);
  
  // If not found, try environment variables
  if (engine === 'unknown') {
    engine = detectEngineFromEnvironment();
  }
  
  // If still not found, try to detect from available binaries
  if (engine === 'unknown') {
    engine = detectEngineFromBinaries();
  }
  
  const engineVersion = getEngineVersion(engine);
  
  return {
    engine,
    nodeVersion,
    engineVersion
  };
}

function detectEngineFromLockFiles(cwd: string): PackageManagerInfo['engine'] {
  // Check for lock files in order of preference
  const lockFiles = [
    { file: 'bun.lockb', engine: 'bun' as const },
    { file: 'pnpm-lock.yaml', engine: 'pnpm' as const },
    { file: 'yarn.lock', engine: 'yarn' as const },
    { file: 'package-lock.json', engine: 'npm' as const }
  ];
  
  for (const { file, engine } of lockFiles) {
    if (existsSync(resolve(cwd, file))) {
      return engine;
    }
  }
  
  return 'unknown';
}

function detectEngineFromEnvironment(): PackageManagerInfo['engine'] {
  // Check npm_config_user_agent
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.includes('bun/')) return 'bun';
    if (userAgent.includes('pnpm/')) return 'pnpm';
    if (userAgent.includes('yarn/')) return 'yarn';
    if (userAgent.includes('npm/')) return 'npm';
  }
  
  // Check npm_execpath
  const execPath = process.env.npm_execpath;
  if (execPath) {
    if (execPath.includes('bun')) return 'bun';
    if (execPath.includes('pnpm')) return 'pnpm';
    if (execPath.includes('yarn')) return 'yarn';
    if (execPath.includes('npm')) return 'npm';
  }
  
  return 'unknown';
}

function detectEngineFromBinaries(): PackageManagerInfo['engine'] {
  const engines = ['bun', 'pnpm', 'yarn', 'npm'] as const;
  
  for (const engine of engines) {
    try {
      execSync(`${engine} --version`, { stdio: 'ignore' });
      return engine;
    } catch {
      // Engine not available, continue
    }
  }
  
  return 'unknown';
}

function getEngineVersion(engine: PackageManagerInfo['engine']): string {
  if (engine === 'unknown') {
    return 'unknown';
  }
  
  try {
    const version = execSync(`${engine} --version`, { encoding: 'utf8' }).trim();
    return version;
  } catch {
    return 'unknown';
  }
}