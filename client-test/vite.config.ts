import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: 'localhost',
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate admin components into their own chunk
          admin: [
            './src/components/Admin/AdminChallenges.tsx',
            './src/components/Admin/Users.tsx',
            './src/components/Admin/Dashboard.tsx',
            './src/components/Admin/addChallenges.tsx',
            './src/components/Admin/ChallengeDetails.tsx',
            './src/components/Admin/sidebar.tsx',
            './src/components/Admin/index.tsx',
            './src/components/Admin/home.tsx',
            './src/components/Admin/datepicker.tsx',
            './src/components/Admin/shared/AnimatedCounter.tsx',
            './src/components/Admin/shared/Badge.tsx',
            './src/components/Admin/shared/Button.tsx',
            './src/components/Admin/shared/SkeletonLoader.tsx',
            './src/components/Admin/shared/types.ts'
          ],
          // Separate vendor libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI libraries
          ui: ['react-hot-toast', 'lucide-react', 'react-icons']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase limit to 1000kb
  }
})