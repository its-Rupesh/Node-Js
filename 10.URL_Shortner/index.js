const express = require("express");
const urlRoute = require("./Routes/url");
const { connectMongoDb } = require("./connection");
const URL = require("./Models/url");

//Server Created
const app = express();
const PORT = 8000;

//Mongo conneted
connectMongoDb("mongodb://127.0.0.1:27017/url-shortner").then(() =>
  console.log("Mongo Connected")
);

//Middleware
app.use(express.json());

// Router
app.use("/url", urlRoute);

//Server Side Rendering
app.get("/", async (req, res) => {
  const result = await URL.find({});
  return res.end(`
    <html>
      <head>
        <h1>Welcome To ShortUrl</h1>
      </head>
        <body>
          <ol>
            ${result
              .map(
                (url) =>
                  `<li>${url.shortId}-->${url.redirectedURL}-->${url.visitHistory.length} </li>`
              )
              .join("")}
          <ol>
        </body>
    </html>
    `);
});

app.listen(PORT, () => console.log("Server Started at 8000"));
