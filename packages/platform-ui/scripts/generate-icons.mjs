import { execSync } from 'node:child_process';

execSync(
  'pnpm exec svgr --typescript --icon --filename-case kebab --out-dir "src/generated-icons" "src/icons"',
  { stdio: 'inherit' }
);
