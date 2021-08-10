const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const passport = require('passport')

const User = require('../models/user')
const userController = require('../controllers/userController');
const { request } = require("express");

// Getting request from Database
router.get("/", userController.getAllUser);

// Signing up or Registering data to server
router.post("/signup", userController.signUpFunction);

router.post("/login", userController.loginFunction);

router.get("/thirdPartyData/:name", passport.authenticate('jwt', {session: false}),userController.githubUser )

module.exports = router;
