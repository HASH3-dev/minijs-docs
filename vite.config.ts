import { defineConfig, PluginOption } from "vite";
import mini from "@mini/vite-plugin";
import path from "path";

const basePath = process.env.NODE_ENV === "production" ? "/minijs-docs" : "/";

export default defineConfig({
  plugins: [mini() as PluginOption],
  assetsInclude: ["**/*.md"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: basePath,
});
