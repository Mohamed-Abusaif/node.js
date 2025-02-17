const http = require("http");

const { routing } = require("./routes/routes");

const server = http.createServer((req, res) => {
  routing(req.url, res);
});

server.listen(5000, () => {
  console.log("server is listening on port 5000");
});
