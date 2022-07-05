import ESBuild from 'esbuild';
import express from 'express';
import path from "path";
import {EventEmitter} from "events";

import config from "./esbuild.config";

const PORT = process.env.PORT || 3000;

const app = express();
const emitter = new EventEmitter();

app.use(express.static(path.resolve(__dirname, "../../build")));

app.get('/subscribe', (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
  };

  res.writeHead(200, headers);
  res.write('data: ');

  emitter.on('refresh', () => {
    res.write('data: message \n\n');
  });
});

function sendMessage() {
  emitter.emit('refresh');
};

app.listen(PORT, () => console.log('server started on http://localhost:' + PORT));

ESBuild.build({

  ...config,
  watch: {
    onRebuild(err) {
      if (err) {
        console.log("Rebuild error >>> ", err);
      } else {
        console.log('rebuild is done ✅ ✅ ✅  ');
        sendMessage();
      }
    }
  }
})
  .then((result) => console.log("Successful build! ✅ ✅ ✅  "))
  .catch(err => {
    console.log(err);
  })
