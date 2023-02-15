const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const asteroidRoutes = require("./asteroidRoute");
const commentRoutes = require("./commentRoutes");

router.use("/users", userRoutes);
router.use("/asteroids", asteroidRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
