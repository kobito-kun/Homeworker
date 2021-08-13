const express = require("express");
const router = express.Router();

const {
  auth
} = require("../middleware/auth.js");

const {
  mainRoute,
  loginRoute
} = require("../controllers/user.js");

router.get("/", mainRoute)
router.post("/login", loginRoute);

module.exports.UserRoutes = router;