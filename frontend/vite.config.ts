import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const isVercel = !!process.env.VERCEL;

export default defineConfig(async ({ command }) => {
  const plugins: Plugin[] = [
    ...react(),
    ...tailwindcss(),
  ];

  // Only prerender locally, skip on Vercel
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

  return {
    plugins,
  };
});
