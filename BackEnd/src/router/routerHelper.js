const xss = require("xss");

// Middleware to sanitize input in the request
const sanitizeInput = (req, res, next) => {
  // Sanitize query parameters to prevent XSS attacks
  if (req.query) {
    for (let param in req.query) {
      req.query[param] = xss(req.query[param]); // Clean each query parameter
    }
  }

  // Sanitize body data (usually for POST, PUT requests)
  if (req.body) {
    for (let bodyParam in req.body) {
      req.body[bodyParam] = xss(req.body[bodyParam]); // Clean each body parameter
    }
  }

  // Sanitize URL parameters (e.g., route parameters like /:id)
  if (req.params) {
    for (let param in req.params) {
      req.params[param] = xss(req.params[param]); // Clean each URL parameter
    }
  }

  // Continue to the next middleware or route handler
  next();
};

// Middleware to check if the request is coming from a bot
function checkBotAccess(req, res, next) {
  // Get the User-Agent from the request headers
  const userAgent = req.headers['user-agent'];

  // List of allowed bots
  const allowedBots = ['Googlebot', 'Bingbot', 'Slurp'];

  // Check if the User-Agent string indicates a bot (common patterns: 'bot', 'crawl', 'slurp', 'spider')
  const isBot = /bot|crawl|slurp|spider/i.test(userAgent);

  // Check if the bot is in the list of allowed bots
  const isAllowedBot = allowedBots.some(bot => userAgent.includes(bot));

  // If it's a bot and not in the allowed list, deny access
  if (isBot && !isAllowedBot) {
    res.status(403).send('Bot access denied');
  } else {
    // Otherwise, allow the request to proceed
    next();
  }
}

// Export the middleware functions for use in other modules
module.exports = { sanitizeInput, checkBotAccess };
