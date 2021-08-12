const express = require("express");
const router = express.Router();

const {
  mainRoute
} = require("../controllers/user.js");

router.get("/", mainRoute)

module.exports.UserRoutes = router;