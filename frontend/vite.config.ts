import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const isVercel = !!process.env.VERCEL; // true on Vercel, false locally

export default defineConfig(async ({ command }) => {
  const plugins: Plugin[] = [
    ...react(),
    ...tailwindcss(),
  ];

  // Run prerender only for local builds
  if (command === "build" && !isVercel) {
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

  return { plugins };
});
