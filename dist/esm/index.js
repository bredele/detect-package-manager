import { execSync } from 'child_process';
const getPackageManager = ()=>{
    const userAgent = process.env.npm_config_user_agent || "";
    if (userAgent.startsWith("pnpm")) return "pnpm";
    if (userAgent.startsWith("yarn")) return "yarn";
    if (userAgent.startsWith("bun")) return "bun";
    return "npm";
};
/**
 * Detect the package manager engine and versions
 */ export default function detectPackageManager() {
    const nodeVersion = process.version;
    const engine = getPackageManager();
    let engineVersion = 'unknown';
    try {
        engineVersion = execSync(`${engine} --version`, {
            encoding: 'utf8'
        }).trim();
    } catch  {
    // If version command fails, keep as 'unknown'
    }
    return {
        engine: engine,
        nodeVersion,
        engineVersion
    };
}

//# sourceMappingURL=index.js.map