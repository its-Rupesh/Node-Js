const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
// show All data
app.get("/api/show_users", (req, res) => {
  return res.json(users);
});

// Show Specific Data
app
  .route("/api/show_users/:id")
  .get((req, res) => {
    console.log(req.params);
    const id = Number(req.params.id);
    const show = users.find((user) => user.id === id);
    return res.json(show);
  })
  .patch((req, res) => {
    res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    res.json({ status: "Pending" });
  });

app.post("/signin", (req, res) => {
  return res.json({ status: "pending" });
});

app.get("/users", (req, res) => {
  const html = `
  <ul>
    ${users
      .map(
        (user) => `
        <li>
            ${user.first_name}
        </li>`
      )
      .join("")}
  </ul>`;
  res.send(html);
});

app.listen(8000, () => {
  console.log("Started");
});
