const express = require("express");
const router = express.Router();

const { 
  auth 
} = require("../middleware/auth.js");

const {
  allRoute,
  getRoute,
  createRoute,
  deleteRoute,
  dateRoute,
} = require("../controllers/homework.js");

router.get("/", auth, allRoute);
router.get("/:_id", auth, getRoute);
router.get("/date/:date", auth, dateRoute);
router.post("/create", auth, createRoute);
router.delete("/delete/:_id", auth, deleteRoute);

module.exports.HomeworkRoutes = router;