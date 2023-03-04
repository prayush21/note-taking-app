/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

// https://vitejs.dev/config/

// const vitestConfig: VitestUserConfigInterface = {
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: './setupTests.ts'
  // }
// };

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',   
    setupFiles: ['src/setupTests.ts']
  },
});
