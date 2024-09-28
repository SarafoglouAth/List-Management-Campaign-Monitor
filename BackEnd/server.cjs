// Import dependencies
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./src/router/router"); // Import the router for handling routes

// Define the port the server will listen on
const port = 5000;

// CORS (Cross-Origin Resource Sharing) options
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin (frontend address)
  credentials: true, // Enable cookies and other credentials to be sent in requests
  optionsSuccessStatus: 200, // Set the status code for successful OPTIONS requests
};

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Use CORS middleware with the specified options to handle cross-origin requests
app.use(cors(corsOptions));

// Use middleware to parse incoming JSON requests with a size limit of 50MB
app.use(express.json({ limit: "50mb" }));

// Use the imported routes for handling API requests
app.use(routes);

// Export the app for use in other modules (e.g., for testing purposes)
module.exports = app;
