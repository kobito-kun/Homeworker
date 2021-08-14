const express = require("express");
const router = express.Router();

const {
  auth
} = require("../middleware/auth.js");

const {
  mainRoute,
  loginRoute,
  registerRoute,
  deleteRoute,
} = require("../controllers/user.js");

router.get("/", mainRoute)
router.post("/login", loginRoute);
router.post("/register", registerRoute);
router.delete("/delete", auth, deleteRoute);

module.exports.UserRoutes = router;