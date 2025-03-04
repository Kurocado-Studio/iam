import { defineConfig, vitestRemix } from '@kurocado-studio/qa';

export default defineConfig({
  ...vitestRemix,
  test: {
    ...vitestRemix.test,
    coverage: {
      ...vitestRemix.test?.coverage,
      // @ts-ignore type-mismatch
      include: ['src/**/*.{ts,tsx}'],
    },
  },
});
