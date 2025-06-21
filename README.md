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
