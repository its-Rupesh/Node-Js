const express = require("express");
const app = express();
//Mongoose Require
const mongoose = require("mongoose");
//Middleware
app.use(express.urlencoded({ extended: false }));

//MongoDb Connect
mongoose
  .connect("mongodb://127.0.0.1:27017/Employee")
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log("MongoDb Error"));

// Database Schema
const userSchema = new mongoose.Schema({
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Jobtitle: {
    type: String,
  },
  Gender: {
    type: String,
  },
});

// Model On Schema
const users = mongoose.model("user", userSchema);

app.get("/api/show_users", async (req, res) => {
  const show_users = await users.find({});
  return res.status(201).json(show_users);
});
app.get("/show_users", async (req, res) => {
  const show_users = await users.find({});
  const html = `
    <ul>
    ${show_users
      .map(
        (user) =>
          `<li>
      ${user.First_Name}->${user.Email}
      </li>`
      )
      .join("")}
    </ul>`;
  res.status(201).send(html);
});
app.post("/create_user", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.First_Name ||
    !body.Last_Name ||
    !body.Email ||
    !body.Jobtitle ||
    !body.Gender
  ) {
    return res.status(400).json({ status: "All Parameter Required" });
  }
  const result = await users.create({
    First_Name: body.First_Name,
    Last_Name: body.Last_Name,
    Email: body.Email,
    Jobtitle: body.Jobtitle,
    Gender: body.Gender,
  });
  console.log(result);
  return res.status(201).json({ status: "Success" });
});
app
  .route("/api/user/:id")
  .get(async (req, res) => {
    const req_user = await users.findById(req.params.id);
    res.status(200).json(req_user);
  })
  .delete(async (req, res) => {
    const req_user = await users.findByIdAndDelete(req.params.id);
    res.status(201).json({ status: "Deleted" });
  })
  .patch(() => {
    const id = Number(req.params.id);
    console.log(id);
    res.status(201).json({ status: "Updated" });
  });
app.listen(8000, () => console.log("Server Started At Port:8000"));
