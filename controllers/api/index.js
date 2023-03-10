const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/users", userRoutes);

router.use("/comments", commentRoutes);

module.exports = router;
