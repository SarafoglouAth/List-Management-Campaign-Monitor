const express = require("express");
const helmet = require("helmet");
const {sanitizeInput,checkBotAccess} = require("./routerHelper.js");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const connection = require("../campaignmonitor/connection.js");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000,
});

router.use(express.json());
router.use(limiter);
router.use(helmet());
router.use(sanitizeInput);
// router.use(checkBotAccess);
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the database API!");
});

module.exports = router;
