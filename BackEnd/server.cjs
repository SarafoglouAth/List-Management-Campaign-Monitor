// Import dependencies
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./src/router/router");

const port = 5000;

const corsOptions = {
  origin: "http://localhost:5173", // This should be your frontend's address
  credentials: true, // This allows cookies to be sent with requests
  optionsSuccessStatus: 200,
};


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(routes);

module.exports = app;
