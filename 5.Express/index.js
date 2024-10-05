const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.get("/about", (req, res) => {
  res.send(`Hey There ${req.query.name}`);
});

app.get("/contact", (req, res) => {
  res.send("contact us at 8180066059");
});

app.listen(8000, () => {
  console.log("Started ");
});
