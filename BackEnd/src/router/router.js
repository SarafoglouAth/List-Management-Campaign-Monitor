// Import necessary modules
const express = require("express");
const helmet = require("helmet");
const { sanitizeInput, checkBotAccess } = require("./routerHelper.js");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const CampaignRoutes = require("../campaignmonitor/routes.js");

// Set up rate limiting: maximum of 2000 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000, // Limit each IP to 2000 requests per windowMs
});

// Middleware to parse incoming JSON requests
router.use(express.json());

// Apply rate limiting to all routes
router.use(limiter);

// Use Helmet to enhance API security by setting various HTTP headers
router.use(helmet());

// Use custom middleware to sanitize input from the user
router.use(sanitizeInput);



// Define routes for subscriber management
router.get("/getAllSubscribers", CampaignRoutes.getAllSubscribers); // Get all active subscribers
router.post("/addOneSubscriber", CampaignRoutes.addOneSubscriber); // Add a new subscriber
router.delete("/deleteOneSubscriber/:Email", CampaignRoutes.deleteOneSubscriber); // Delete a subscriber by email

// Export the router to be used in the main application
module.exports = router;
