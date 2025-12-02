import { defineConfig } from "vite";
import mini from "@mini/vite-plugin";
import path from "path";

export default defineConfig({
  plugins: [mini()],
  assetsInclude: ["**/*.md"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
