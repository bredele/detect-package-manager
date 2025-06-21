# @bredele/detect-package-manager

Detect the package manager engine (npm, pnpm, yarn, bun) and versions in any project.

## Installation

```bash
npm install @bredele/detect-package-manager
```

## Usage

```typescript
import detectPackageManager from '@bredele/detect-package-manager';

// Detect from current working directory
const info = detectPackageManager();
console.log(info);
// {
//   engine: 'npm',
//   nodeVersion: 'v18.17.0',
//   engineVersion: '9.6.7'
// }

// Detect from specific directory
const projectInfo = detectPackageManager('/path/to/project');
```

## API

### `detectPackageManager(cwd?: string): PackageManagerInfo`

Detects the package manager used in a project directory.

**Parameters:**
- `cwd` (optional): The directory to analyze. Defaults to `process.cwd()`.

**Returns:**
```typescript
interface PackageManagerInfo {
  engine: 'npm' | 'pnpm' | 'yarn' | 'bun' | 'unknown';
  nodeVersion: string;
  engineVersion: string;
}
```

## Detection Strategy

The function uses multiple detection methods in order of preference:

1. **Lock files**: Checks for `bun.lockb`, `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`
2. **Environment variables**: Analyzes `npm_config_user_agent` and `npm_execpath`
3. **Binary availability**: Tests which package manager binaries are available

## License

MIT