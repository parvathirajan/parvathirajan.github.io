import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
    strictPort: true,
    // Opening the site path asks the operating system to reuse the default
    // browser, which normally creates a tab in the already-running browser.
    open: "/",
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.js"],
    clearMocks: true,
  },
});
