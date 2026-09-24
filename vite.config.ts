import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import injectPreload from "unplugin-inject-preload/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    injectPreload({
      files: [
        {
          outputMatch: /inter-latin.*\.woff2$/,
          attributes: {
            type: "font/woff2",
            crossorigin: "anonymous",
          },
        },
      ],
    }),
  ],
  build: {
    sourcemap: "hidden",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("motion")) return "motion";
            if (id.includes("lucide-react")) return "icons";
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "vendor";
            }
          }
        },
      },
    },
  },
});
