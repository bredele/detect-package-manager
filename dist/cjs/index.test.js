"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nodetest = require("node:test");
const _nodeassert = require("node:assert");
const _index = /*#__PURE__*/ _interop_require_default(require("./index.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _nodetest.test)('detectPackageManager should detect pnpm from user agent', ()=>{
    const originalUserAgent = process.env.npm_config_user_agent;
    process.env.npm_config_user_agent = 'pnpm/8.6.12 npm/? node/v18.17.0 darwin arm64';
    const result = (0, _index.default)();
    _nodeassert.strict.equal(result.engine, 'pnpm');
    _nodeassert.strict.ok(result.nodeVersion.startsWith('v'));
    _nodeassert.strict.ok(result.engineVersion);
    // Restore original environment
    if (originalUserAgent) {
        process.env.npm_config_user_agent = originalUserAgent;
    } else {
        delete process.env.npm_config_user_agent;
    }
});
(0, _nodetest.test)('detectPackageManager should detect yarn from user agent', ()=>{
    const originalUserAgent = process.env.npm_config_user_agent;
    process.env.npm_config_user_agent = 'yarn/1.22.19 npm/? node/v18.17.0 darwin arm64';
    const result = (0, _index.default)();
    _nodeassert.strict.equal(result.engine, 'yarn');
    _nodeassert.strict.ok(result.nodeVersion.startsWith('v'));
    // Restore original environment
    if (originalUserAgent) {
        process.env.npm_config_user_agent = originalUserAgent;
    } else {
        delete process.env.npm_config_user_agent;
    }
});
(0, _nodetest.test)('detectPackageManager should detect bun from user agent', ()=>{
    const originalUserAgent = process.env.npm_config_user_agent;
    process.env.npm_config_user_agent = 'bun/1.0.0 npm/? node/v18.17.0 darwin arm64';
    const result = (0, _index.default)();
    _nodeassert.strict.equal(result.engine, 'bun');
    _nodeassert.strict.ok(result.nodeVersion.startsWith('v'));
    // Restore original environment
    if (originalUserAgent) {
        process.env.npm_config_user_agent = originalUserAgent;
    } else {
        delete process.env.npm_config_user_agent;
    }
});
(0, _nodetest.test)('detectPackageManager should default to npm when no user agent', ()=>{
    const originalUserAgent = process.env.npm_config_user_agent;
    delete process.env.npm_config_user_agent;
    const result = (0, _index.default)();
    _nodeassert.strict.equal(result.engine, 'npm');
    _nodeassert.strict.ok(result.nodeVersion.startsWith('v'));
    _nodeassert.strict.ok(typeof result.engineVersion === 'string');
    // Restore original environment
    if (originalUserAgent) {
        process.env.npm_config_user_agent = originalUserAgent;
    }
});
(0, _nodetest.test)('detectPackageManager should default to npm when user agent is empty', ()=>{
    const originalUserAgent = process.env.npm_config_user_agent;
    process.env.npm_config_user_agent = '';
    const result = (0, _index.default)();
    _nodeassert.strict.equal(result.engine, 'npm');
    _nodeassert.strict.ok(result.nodeVersion.startsWith('v'));
    // Restore original environment
    if (originalUserAgent) {
        process.env.npm_config_user_agent = originalUserAgent;
    } else {
        delete process.env.npm_config_user_agent;
    }
});
(0, _nodetest.test)('detectPackageManager should return node version', ()=>{
    const result = (0, _index.default)();
    _nodeassert.strict.ok(result.nodeVersion.startsWith('v'));
    _nodeassert.strict.match(result.nodeVersion, /^v\d+\.\d+\.\d+/);
});
(0, _nodetest.test)('detectPackageManager should return engine version', ()=>{
    const result = (0, _index.default)();
    // Should be able to get version for the detected engine
    _nodeassert.strict.ok(typeof result.engineVersion === 'string');
});
(0, _nodetest.test)('detectPackageManager should handle startsWith correctly', ()=>{
    const originalUserAgent = process.env.npm_config_user_agent;
    // Test that it uses startsWith, not includes
    process.env.npm_config_user_agent = 'npm/10.0.0 containing-pnpm node/v18.17.0';
    const result = (0, _index.default)();
    // Should detect as npm since it starts with npm, not pnpm
    _nodeassert.strict.equal(result.engine, 'npm');
    // Restore original environment
    if (originalUserAgent) {
        process.env.npm_config_user_agent = originalUserAgent;
    } else {
        delete process.env.npm_config_user_agent;
    }
});

//# sourceMappingURL=index.test.js.map