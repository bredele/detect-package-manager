# @bredele/detect-package-manager

Detect the package manager engine (npm, pnpm, yarn, bun) and versions.

## Installation

```bash
npm install @bredele/detect-package-manager
```

## Usage

```typescript
import detectPackageManager from '@bredele/detect-package-manager';

const info = detectPackageManager();
console.log(info);
// {
//   engine: 'npm',
//   nodeVersion: 'v18.17.0',
//   engineVersion: '9.6.7'
// }
```

## API

### `detectPackageManager(): PackageManagerInfo`

Detects the package manager currently being used.

**Returns:**
```typescript
interface PackageManagerInfo {
  engine: 'npm' | 'pnpm' | 'yarn' | 'bun';
  nodeVersion: string;
  engineVersion: string;
}
```

## Detection Strategy

The function detects the package manager and its version by parsing the `npm_config_user_agent` environment variable:

1. **Primary method**: Parses the user agent string (e.g., `pnpm/8.6.12 npm/? node/v18.17.0 darwin arm64`) to extract both engine name and version
2. **Fallback method**: If parsing fails, falls back to simple prefix detection and executes `{engine} --version` command

The `npm_config_user_agent` environment variable is automatically set by package managers when running npm scripts and contains both the package manager name and version in a predictable format.

## License

MIT