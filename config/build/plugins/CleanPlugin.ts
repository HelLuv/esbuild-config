import {Plugin} from "esbuild";
import {rm} from "fs/promises";

export const CleanPlugin: Plugin = {
  name: 'CleanPlugin',
  setup(build) {
    build.onStart(async () => {
      try {
        const outdir = build.initialOptions.outdir;
        if (outdir) {
          // Carefully, set the right path to the folder being cleared, can delete system files
         await rm(outdir, {recursive: true});
        }
      } catch (e) {
        console.log("Failed to clean build folder: error >>> ", e)
      }
    })
  },
}