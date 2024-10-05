const http = require("http");
const fs = require("fs");
const url = require("url");

const myserver = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}:Request Recieved on ${req.url} Type:${
    req.method
  }\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("client.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Welcome to server");
        break;
      case "/about":
        res.end(`This is ${myUrl.query.my_name} Server`);
        break;
      case "/search":
        const serarched = myUrl.query.search_query;
        res.end(`your results for ` + serarched);
      default:
        res.end("404 Not Found");
    }
  });
});

myserver.listen(9000, () => {
  console.log("Server Started Succesfully");
});
