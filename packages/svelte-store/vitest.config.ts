import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    name: 'svelte-store',
    dir: './src',
    watch: false,
    environment: 'jsdom',
    globals: true,
    coverage: { provider: 'istanbul' },
  },
})
