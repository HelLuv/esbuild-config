import {Plugin} from "esbuild";
import {rm, writeFile} from "fs/promises";
import path from "path";

interface HTMLPluginOptions {
  template?: string;
  title?: string;
  jsPaths?: string[];
  cssPaths?: string[];
}

const preparePaths = (outputs: string[]) => {
  return outputs.reduce<Array<string[]>>((acc, path) => {
    const [js, css] = acc;
    const splittedFileName = path.split("/").pop();

    if (splittedFileName?.endsWith(".js")) {
      js.push(splittedFileName);
    } else if (splittedFileName?.endsWith(".css")) {
      css.push(splittedFileName);
    }

    return acc;
  }, [[], []]);
};

const renderHTML: (options: HTMLPluginOptions) => string = ({template, title = "ES Build", jsPaths, cssPaths}) => {
  return (
    template || `
          <!doctype html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${title}</title>
            ${cssPaths?.map((path) => `<link href="${path}" rel="stylesheet"/>`).join("\n")}
          </head>
          <body>
            <div id="root"></div>
            ${jsPaths?.map((path) => `<script src="${path}"></script>`).join("\n")}
            <script>
              const eventSource = new EventSource('http://localhost:3000/subscribe');
              eventSource.onopen = function () {console.log("event source connection is open")};
              eventSource.onerror = function () {console.log("some error ocurred in event source")};
              eventSource.onmessage = function () {
                  console.log("event source window reload");
                  window.location.reload();
              };
            </script>
          </body>
          </html>
          `
  );
};

export const HTMLPlugin: (options: HTMLPluginOptions) => Plugin = (options): Plugin => {
  return {
    name: 'HTMLPlugin',
    setup(build) {
      const outdir = build.initialOptions.outdir;

      build.onStart(async () => {
        try {
          if (outdir) {
            // Carefully, set the right path to the folder being cleared, can delete system files
            await rm(outdir, {recursive: true});
          }
        } catch (e) {
          console.log("Failed to clean build folder: error >>> ", e);
        }
      });

      build.onEnd(async (result) => {
        const outputs = result.metafile?.outputs;
        const [jsPaths, cssPaths] = preparePaths(Object.keys(outputs || []));
        if (outdir) {
          await writeFile(
            path.resolve(outdir, "index.html"),
            renderHTML({jsPaths, cssPaths,...options})
          );
        }
      });
    },
  };
};