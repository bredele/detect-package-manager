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

The function detects the package manager by checking the `npm_config_user_agent` environment variable:

- If it starts with `pnpm` → returns `'pnpm'`
- If it starts with `yarn` → returns `'yarn'`
- If it starts with `bun` → returns `'bun'`
- Otherwise → returns `'npm'`

This environment variable is automatically set by package managers when running npm scripts.

## License

MIT