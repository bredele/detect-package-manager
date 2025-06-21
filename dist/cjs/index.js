"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, /**
 * Detect the package manager engine and versions
 */ "default", {
    enumerable: true,
    get: function() {
        return detectPackageManager;
    }
});
const _child_process = require("child_process");
const getPackageManager = ()=>{
    const userAgent = process.env.npm_config_user_agent || "";
    if (userAgent.startsWith("pnpm")) return "pnpm";
    if (userAgent.startsWith("yarn")) return "yarn";
    if (userAgent.startsWith("bun")) return "bun";
    return "npm";
};
function detectPackageManager() {
    const nodeVersion = process.version;
    const engine = getPackageManager();
    let engineVersion = 'unknown';
    try {
        engineVersion = (0, _child_process.execSync)(`${engine} --version`, {
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