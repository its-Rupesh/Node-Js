const express = require("express");
const app = express();
const user_router = require("./Routes/user");
const { connectMongoDb } = require("./connection");

connectMongoDb("mongodb://127.0.0.1:27017/Employee");

app.use(express.urlencoded({ extended: false }));
app.use("/user", user_router);

app.listen(8000, () => console.log("Server Started At Port: 8000"));
