const http = require("http");

const myserver = http.createServer((req, res) => {
  console.log("Request Asked"); //-> For Hardware or Machine for server Engineeer(VsCode)
  res.end("Request Accepted"); //-> Respond on Server
});

myserver.listen(8000, () => {
  console.log("Server Started Succesfully"); //-> Optional Shows if server run succesfully
});
