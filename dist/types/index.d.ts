export interface PackageManagerInfo {
    engine: 'npm' | 'pnpm' | 'yarn' | 'bun' | 'unknown';
    nodeVersion: string;
    engineVersion: string;
}
/**
 * Detect the package manager engine and versions
 */
export default function detectPackageManager(cwd?: string): PackageManagerInfo;
//# sourceMappingURL=index.d.ts.map