import path from "path";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  root: path.resolve(__dirname, "src","vanilla"),
  build: {
    outDir: path.resolve(
      __dirname,
      "src",
      "vanilla",
      "dist"
    ),
    emptyOutDir: true,
  },
  define: {
    global: "window",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    EnvironmentPlugin("all", { prefix: "CANISTER_" }),
    EnvironmentPlugin("all", { prefix: "DFX_" }),
    EnvironmentPlugin({ BACKEND_CANISTER_ID: "" }),
    EnvironmentPlugin({ CALC_CANISTER_ID: "" }),
  ],
});
