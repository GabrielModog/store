import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'svelte-store',
    dir: './src',
    watch: false,
    environment: 'jsdom',
    globals: true,
    coverage: { provider: 'istanbul' },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})
