const { getUser } = require("../service/auth");

async function restrictToLoginUserOnly(req, res, next) {
  //console.log(req);
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}
module.exports = {
  restrictToLoginUserOnly,
  checkAuth,
};