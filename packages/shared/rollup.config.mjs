import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";

export default [
  {
    plugins: [esbuild()],
    input: "src/index.ts",
    output: [
      {
        file: `dist/cjs/index.js`,
        format: "cjs",
      },
      {
        file: `dist/es/index.js`,
        format: "es",
      },
    ],
  },
  {
    input: "src/index.ts",
    plugins: [dts()],
    output: [
      {
        file: `dist/types/index.d.ts`,
        format: "es",
      },
      {
        file: `dist/es/index.d.ts`,
        format: "es",
      },
      {
        file: `dist/cjs/index.d.ts`,
        format: "cjs",
      },
    ],
  },
];
