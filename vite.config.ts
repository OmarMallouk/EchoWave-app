import path from "path"
import { defineConfig } from 'vite'
import { visualizer } from "rollup-plugin-visualizer"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({
    filename: './dist/stats.html', 
    open: true,                 
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
