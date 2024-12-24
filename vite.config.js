import { defineConfig } from "vite";
import path from "path";
// import AutoImport from "unplugin-auto-import/vite";
// import { glob } from "glob";

export default defineConfig({
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: "assets/js/app.[hash].js",
        assetFileNames: ({ name }) => {
          const { ext } = path.parse(name);

          const outputMap = {
            ".css": `assets/css/app.[hash].css`,
            ".ttf": "assets/fonts/[name].[ext]",
            ".otf": "assets/fonts/[name].[ext]",
            ".woff": "assets/fonts/[name].[ext]",
            ".woff2": "assets/fonts/[name].[ext]",
            ".mp4": "assets/videos/[name].[ext]",
            ".ogv": "assets/videos/[name].[ext]",
            ".webm": "assets/videos/[name].[ext]",
          };

          return outputMap[ext] || `assets/img/[name].[ext]`;
        },
      },
    },
  },
  plugins: [
    // AutoImport({
    //   include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/, /\.astro$/],
    //   imports: [
    //     {
    //       ...glob
    //         .sync("src/components/**/*.{astro,vue,mdx,tsx,jsx}")
    //         .reduce((acc, file) => {
    //           const fileName = file.split(/[/\\]/).pop().split(".")[0];
    //           const importPath = `${file.replace(/\\/g, "/")}`;
    //           acc[importPath] = [[fileName], fileName];
    //           return acc;
    //         }, {}),
    //     },
    //   ],
    //   // dirs: ["./src/components/*.{astro}"],
    //   dts: "./auto-imports.d.ts",
    // }),
  ],
});
