const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
const passport = require("passport");

router.get("/list", usersController.list);

router.post("/register", usersController.register);

router.post("/login", passport.authenticate("local"), usersController.login);

router.post("/logout", usersController.logout);

router.get("/:id", usersController.fetchUser);

router.put("/:id/favorite/:media_type", usersController.manageFavorite);

module.exports = router;
