const express = require("express");
const router = express.Router();
const { generateURL, analytical, redirected } = require("../Controllers/url");

router.post("/", generateURL);
router.get("/analytics/:shortId", analytical);
router.get("/visit/:shortId", redirected);
module.exports = router;
