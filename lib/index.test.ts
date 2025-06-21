import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import detectPackageManager from './index.js';

test('detectPackageManager should detect pnpm from user agent', () => {
  const originalUserAgent = process.env.npm_config_user_agent;
  process.env.npm_config_user_agent = 'pnpm/8.6.12 npm/? node/v18.17.0 darwin arm64';
  
  const result = detectPackageManager();
  
  assert.equal(result.engine, 'pnpm');
  assert.ok(result.nodeVersion.startsWith('v'));
  assert.ok(result.engineVersion);
  
  // Restore original environment
  if (originalUserAgent) {
    process.env.npm_config_user_agent = originalUserAgent;
  } else {
    delete process.env.npm_config_user_agent;
  }
});

test('detectPackageManager should detect yarn from user agent', () => {
  const originalUserAgent = process.env.npm_config_user_agent;
  process.env.npm_config_user_agent = 'yarn/1.22.19 npm/? node/v18.17.0 darwin arm64';
  
  const result = detectPackageManager();
  
  assert.equal(result.engine, 'yarn');
  assert.ok(result.nodeVersion.startsWith('v'));
  
  // Restore original environment
  if (originalUserAgent) {
    process.env.npm_config_user_agent = originalUserAgent;
  } else {
    delete process.env.npm_config_user_agent;
  }
});

test('detectPackageManager should detect bun from user agent', () => {
  const originalUserAgent = process.env.npm_config_user_agent;
  process.env.npm_config_user_agent = 'bun/1.0.0 npm/? node/v18.17.0 darwin arm64';
  
  const result = detectPackageManager();
  
  assert.equal(result.engine, 'bun');
  assert.ok(result.nodeVersion.startsWith('v'));
  
  // Restore original environment
  if (originalUserAgent) {
    process.env.npm_config_user_agent = originalUserAgent;
  } else {
    delete process.env.npm_config_user_agent;
  }
});

test('detectPackageManager should default to npm when no user agent', () => {
  const originalUserAgent = process.env.npm_config_user_agent;
  delete process.env.npm_config_user_agent;
  
  const result = detectPackageManager();
  
  assert.equal(result.engine, 'npm');
  assert.ok(result.nodeVersion.startsWith('v'));
  assert.equal(result.engineVersion, 'unknown');
  
  // Restore original environment
  if (originalUserAgent) {
    process.env.npm_config_user_agent = originalUserAgent;
  }
});

test('detectPackageManager should default to npm when user agent is empty', () => {
  const originalUserAgent = process.env.npm_config_user_agent;
  process.env.npm_config_user_agent = '';
  
  const result = detectPackageManager();
  
  assert.equal(result.engine, 'npm');
  assert.ok(result.nodeVersion.startsWith('v'));
  assert.equal(result.engineVersion, 'unknown');
  
  // Restore original environment
  if (originalUserAgent) {
    process.env.npm_config_user_agent = originalUserAgent;
  } else {
    delete process.env.npm_config_user_agent;
  }
});

test('detectPackageManager should return node version', () => {
  const result = detectPackageManager();
  
  assert.ok(result.nodeVersion.startsWith('v'));
  assert.match(result.nodeVersion, /^v\d+\.\d+\.\d+/);
});

test('detectPackageManager should return engine version', () => {
  const result = detectPackageManager();
  
  // Should return a string (either parsed version or 'unknown')
  assert.ok(typeof result.engineVersion === 'string');
});

test('detectPackageManager should handle startsWith correctly', () => {
  const originalUserAgent = process.env.npm_config_user_agent;
  
  // Test that it uses startsWith, not includes
  process.env.npm_config_user_agent = 'npm/10.0.0 containing-pnpm node/v18.17.0';
  
  const result = detectPackageManager();
  
  // Should detect as npm since it starts with npm, not pnpm
  assert.equal(result.engine, 'npm');
  assert.equal(result.engineVersion, '10.0.0');
  
  // Restore original environment
  if (originalUserAgent) {
    process.env.npm_config_user_agent = originalUserAgent;
  } else {
    delete process.env.npm_config_user_agent;
  }
});

test('detectPackageManager should extract version from user agent', () => {
  const originalUserAgent = process.env.npm_config_user_agent;
  process.env.npm_config_user_agent = 'pnpm/8.6.12 npm/? node/v18.17.0 darwin arm64';
  
  const result = detectPackageManager();
  
  assert.equal(result.engine, 'pnpm');
  assert.equal(result.engineVersion, '8.6.12');
  assert.ok(result.nodeVersion.startsWith('v'));
  
  // Restore original environment
  if (originalUserAgent) {
    process.env.npm_config_user_agent = originalUserAgent;
  } else {
    delete process.env.npm_config_user_agent;
  }
});

test('detectPackageManager should extract yarn version from user agent', () => {
  const originalUserAgent = process.env.npm_config_user_agent;
  process.env.npm_config_user_agent = 'yarn/1.22.19 npm/? node/v18.17.0 darwin arm64';
  
  const result = detectPackageManager();
  
  assert.equal(result.engine, 'yarn');
  assert.equal(result.engineVersion, '1.22.19');
  
  // Restore original environment
  if (originalUserAgent) {
    process.env.npm_config_user_agent = originalUserAgent;
  } else {
    delete process.env.npm_config_user_agent;
  }
});

test('detectPackageManager should extract bun version from user agent', () => {
  const originalUserAgent = process.env.npm_config_user_agent;
  process.env.npm_config_user_agent = 'bun/1.0.0 npm/? node/v18.17.0 darwin arm64';
  
  const result = detectPackageManager();
  
  assert.equal(result.engine, 'bun');
  assert.equal(result.engineVersion, '1.0.0');
  
  // Restore original environment
  if (originalUserAgent) {
    process.env.npm_config_user_agent = originalUserAgent;
  } else {
    delete process.env.npm_config_user_agent;
  }
});