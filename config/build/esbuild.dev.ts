import ESBuild from 'esbuild';
import express from 'express';
import config from "./esbuild.config";
import path from "path";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, "../../build")));

app.listen(PORT, () => console.log('server started on http://localhost:' + PORT));

ESBuild.build(config)
  .then((result) => console.log("Successful build! ✅ ✅ ✅  "))
  .catch(err => {
    console.log(err);
  })
