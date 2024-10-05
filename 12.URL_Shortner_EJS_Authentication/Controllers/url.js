const shortid = require("shortid");
const URL = require("../Models/url");

async function generateURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ status: "URL Not Provided" });
  }
  const shortId = shortid.generate();
  await URL.create({
    shortId: shortId,
    redirectedURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.status(200).render("home", { id: shortId });
}

async function analytical(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ status: "URL Not Found" });
  }
  return res.json({
    totalclicks: result.visitHistory.length,
    analytics: result.visitHistory,
    user: result,
  });
}
async function redirected(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectedURL);
}

module.exports = {
  generateURL,
  analytical,
  redirected,
};
