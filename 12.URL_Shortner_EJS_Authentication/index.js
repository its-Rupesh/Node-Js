const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./connection");
//routes
const urlRoute = require("./Routes/url");
const staticRouter = require("./Routes/staticRouter");
const userRouter = require("./Routes/user");

//Middleware for Authorisation
const { restrictToLoginUserOnly, checkAuth } = require("./middleware/auth");

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
app.use(cookieParser());

// Router
app.use("/url", restrictToLoginUserOnly, urlRoute);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log("Server Started at 8000"));
