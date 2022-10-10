const express = require("express");
const user = require("./user");
const media = require("./media");
const router = express.Router();
const passport = require("passport");
const validateCookie = require("../middleware/auth");

router.use("/me", validateCookie, (req, res) => {
  res.send(req.user);
});
router.use("/user", user);
router.use("/media", media);

module.exports = router;
