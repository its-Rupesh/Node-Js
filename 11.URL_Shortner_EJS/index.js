const express = require("express");
const path = require("path");
const urlRoute = require("./Routes/url");
const { connectMongoDb } = require("./connection");
const URL = require("./Models/url");
const staticRouter = require("./Routes/staticRouter");
//Server Created
const app = express();
const PORT = 8000;

//Mongo conneted
connectMongoDb("mongodb://127.0.0.1:27017/url-shortner").then(() =>
  console.log("Mongo Connected")
);
//EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Router
app.use("/url", urlRoute);
app.use("/", staticRouter);

// //Server Side Rendering
// app.get("/", async (req, res) => {
//   const result = await URL.find({});
//   return res.render("home", {
//     urls: result,
//   });
// });

app.listen(PORT, () => console.log("Server Started at 8000"));
