import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Important for Render
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 8080,
  }
});