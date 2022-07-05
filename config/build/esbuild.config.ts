import path from "path";
import {BuildOptions} from "esbuild";


const mode = process.env.MODE || "development";

const isDev = mode === "development";
const isProd = mode === "production";

function resolveRoot(...segments: string[]) {
  return path.resolve(__dirname, "../../", ...segments);
}

const config: BuildOptions = {
  outdir: resolveRoot("build"),
  entryPoints: [resolveRoot("src/index.jsx")],
  entryNames: 'bundle',
  bundle: true,
  minify: isProd,
  sourcemap: isDev,
  tsconfig: resolveRoot("tsconfig.json"),
}
export default config;

