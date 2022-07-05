import path from "path";
import {BuildOptions} from "esbuild";

import {CleanPlugin} from "./plugins/CleanPlugin";
import {HTMLPlugin} from "./plugins/HTMLPlugin";


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
  metafile: true,
  loader: {
    ".png": "file",
    ".jpg": "file",
    ".jpeg": "file",
    ".svg": "file",
  },
  plugins: [
    CleanPlugin,
    HTMLPlugin({
      title: "ES Build for sure"
    })
  ],
  watch: isDev && {
    onRebuild(err) {
      if (err) {
        console.log("Rebuild error >>> ", err);
      } else {
        console.log('rebuilded ✅ ✅ ✅  ');
      }
    }
  }
}
export default config;

