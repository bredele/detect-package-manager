export interface PackageManagerInfo {
    engine: 'npm' | 'pnpm' | 'yarn' | 'bun';
    nodeVersion: string;
    engineVersion: string;
}
/**
 * Detect the package manager engine and versions
 */
export default function detectPackageManager(): PackageManagerInfo;
//# sourceMappingURL=index.d.ts.map