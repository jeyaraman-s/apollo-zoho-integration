const express = require("express");
const router = express.Router();
const checkRateLimit = require("../controllers/rateLimitController");

router.get("/check-rate-limit", checkRateLimit);

module.exports = router;
