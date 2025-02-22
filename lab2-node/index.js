const http = require("http");

const { routing } = require("./routes/routes");

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  routing(req, res);
});

//configure linter auto format

server.listen(5050, () => {
  console.log("server is listening on port 5050");
});
