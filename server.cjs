const path = require("node:path");
const {createServer} = require("node:http");
const next = require("next");

const dir      = path.join(__dirname, "website");
const hostname = "127.0.0.1";
const port     = 3100;
const app      = next({dev: false, dir, hostname, port});
const handle   = app.getRequestHandler();

app.prepare().then(() => {
  createServer((request, response) => handle(request, response)).listen(port, hostname, () => {
    console.log(`BargazLive listening on http://${hostname}:${port}`);
  });
}).catch(error => {
  console.error("BargazLive failed to start:", error);
  process.exit(1);
});
