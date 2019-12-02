const express = require("express");
const authenticateRouter = express.Router();
const passport = require("../../authenticate");

const { User } = require("../../mongoose");

const authentication = passport.authenticate("local", {
  successRedirect: "/news",
  failureRedirect: "/",
  failureFlash: true
});

authenticateRouter.get("/register", (req, res) => res.render("register"));

authenticateRouter.get("/login", (req, res) => res.render("login"));

authenticateRouter.post("/register", (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err) return console.log("Error");
    res.redirect("/news");
  });
});

authenticateRouter.post("/login", authentication);

module.exports = authenticateRouter;
