const express = require("express");
const app = express();
const fs = require("fs");
const data = require("./MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // For parsing JSON bodies

// Get all users
app.get("/show_users", (req, res) => {
  console.log(req.headers);
  res.set("name", "Rupesh");
  return res.json(data);
});

// Get a specific user by ID
app.route("/show_user/:id").get((req, res) => {
  const id = Number(req.params.id);
  const user = data.find((it) => it.id === id);

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Add a new user
app.post("/login", (req, res) => {
  const val = req.body;
  data.push({ ...val, id: data.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to write to file" });
    }
    return res.json({ status: "success", id: data.length });
  });
});

// Delete a user by ID
app.delete("/delete_user/:id", (req, res) => {
  const id = Number(req.params.id);

  // Find index of user with the given id
  const index = data.findIndex((user) => user.id === id);

  if (index !== -1) {
    // Remove the user from the array
    data.splice(index, 1);

    // Write the updated data back to MOCK_DATA.json
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to write to file" });
      }
      return res.json({
        status: "success",
        message: "User deleted successfully",
      });
    });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Start the server
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
