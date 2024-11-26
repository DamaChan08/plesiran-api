const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");
const fileRoutes = require("./file.route");
const tripRoutes = require("./trip.route");

router.use("/auth", authRoutes);
router.use("/file", fileRoutes);
router.use("/trip-tour", tripRoutes);

module.exports = router;
