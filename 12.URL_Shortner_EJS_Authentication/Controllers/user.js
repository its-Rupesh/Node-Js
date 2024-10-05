const user = require("../Models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
async function userSignup(req, res) {
  const { name, email, password } = req.body;
  await user.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}
async function userLogin(req, res) {
  const { email, password } = req.body;
  const req_user = await user.findOne({ email, password });
  //console.log("req_user->", req_user);
  if (!req_user) {
    return res.status(400).render("login", {
      error: "Invalid User",
    });
  }
  const sessionId = uuidv4();
  setUser(sessionId, req_user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}
module.exports = { userSignup, userLogin };
