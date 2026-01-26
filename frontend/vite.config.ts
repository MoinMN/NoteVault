import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async ({ command }) => {
  const plugins: Plugin[] = [
    ...react(),
    ...tailwindcss(),
  ];

  if (command === "build") {
    const { default: prerender } = await import("vite-plugin-prerender");

    plugins.push(
      prerender({
        staticDir: "dist",
        routes: [
          "/",
          "/about",
          "/terms",
          "/privacy",
          "/contact",
        ],
      })
    );
  }

  return {
    plugins,
  };
});
