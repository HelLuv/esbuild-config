import path from "path";
import {BuildOptions} from "esbuild";

import {CleanPlugin} from "./plugins/CleanPlugin";


const mode = process.env.MODE || "development";

const isDev = mode === "development";
const isProd = mode === "production";

function resolveRoot(...segments: string[]) {
  return path.resolve(__dirname, "../../", ...segments);
}

const config: BuildOptions = {
  outdir: resolveRoot("build"),
  entryPoints: [resolveRoot("src/index.jsx")],
  entryNames: '[dir]/bundle.[name]-[hash]',
  allowOverwrite: true,
  bundle: true,
  minify: isProd,
  sourcemap: isDev,
  tsconfig: resolveRoot("tsconfig.json"),
  loader: {
    ".png": "file",
    ".jpg": "file",
    ".jpeg": "file",
    ".svg": "file",
  },
  plugins: [CleanPlugin],
}
export default config;

