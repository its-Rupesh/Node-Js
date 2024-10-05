const express = require("express");
const router = express.Router();
const URL = require("../Models/url");
router.get("/", async (req, res) => {
  const allurls = await URL.find({});
  console.log(allurls);
  return res.status(200).render("home", {
    urls: allurls,
  });
});
module.exports = router;
