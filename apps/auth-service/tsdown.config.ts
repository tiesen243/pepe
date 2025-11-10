import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/main.ts'],
  dts: true,
  shims: true,
  exports: true,
})
