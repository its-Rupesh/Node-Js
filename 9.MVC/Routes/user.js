const express = require("express");
const router = express.Router();

const {
  getuser,
  createUser,
  getuserById,
  deleteuserById,
  updateuserById,
} = require("../Controllers/controller");

router.route("/").get(getuser).post(createUser);
router
  .route("/:id")
  .get(getuserById)
  .delete(deleteuserById)
  .patch(updateuserById);

module.exports = router;
