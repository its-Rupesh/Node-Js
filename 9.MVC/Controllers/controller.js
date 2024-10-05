const users = require("../Models/model");

async function getuser(req, res) {
  const show_users = await users.find({});
  return res.status(201).json(show_users);
}
async function getuserById(req, res) {
  const req_user = await users.findById(req.params.id);
  res.status(200).json(req_user);
}
async function deleteuserById(req, res) {
  const req_user = await users.findByIdAndDelete(req.params.id);
  res.status(201).json({ status: "Deleted" });
}
async function updateuserById(req, res) {
  const id = Number(req.params.id);
  console.log(id);
  res.status(201).json({ status: "Updated" });
}

async function createUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.First_Name ||
    !body.Last_Name ||
    !body.Email ||
    !body.Jobtitle ||
    !body.Gender
  ) {
    console.log(req.body);
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
}

module.exports = {
  getuser,
  createUser,
  getuserById,
  deleteuserById,
  updateuserById,
};
