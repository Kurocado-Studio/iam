/* eslint-disable import/no-default-export */
import { type Options, defineConfig } from 'tsup';

const tsupOptions: Options = {
  clean: true,
  dts: true,
  entry: ['src/index.ts', 'src/remix/setup.npm.ts'],
  external: ['react'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  splitting: true,
  target: 'node20',
  treeshake: true,
};

export default defineConfig((options: Options) => ({
  ...tsupOptions,
  ...options,
}));
