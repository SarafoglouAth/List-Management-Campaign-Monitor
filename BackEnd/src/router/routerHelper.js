const xss = require("xss");


// Middleware to sanitize input
const sanitizeInput = (req, res, next) => {
  // Sanitize query parameters
  if (req.query) {
    for (let param in req.query) {
      req.query[param] = xss(req.query[param]);
    }
  }

  // Sanitize body data
  if (req.body) {
    for (let bodyParam in req.body) {
      req.body[bodyParam] = xss(req.body[bodyParam]);
    }
  }

  // Sanitize URL parameters
  if (req.params) {
    for (let param in req.params) {
      req.params[param] = xss(req.params[param]);
    }
  }

  next();
};

function checkBotAccess(req, res, next) {
    const userAgent = req.headers['user-agent'];
  
    // List of allowed bots
    const allowedBots = ['Googlebot', 'Bingbot', 'Slurp'];
  
    // Check if the User-Agent string contains the name of a bot
    const isBot = /bot|crawl|slurp|spider/i.test(userAgent);
  
    // Check if the bot is in the list of allowed bots
    const isAllowedBot = allowedBots.some(bot => userAgent.includes(bot));
  
    if (isBot && !isAllowedBot) {
      res.status(403).send('Bot access denied');
    } else {
      next();
    }
  }
  

module.exports = {sanitizeInput ,checkBotAccess};