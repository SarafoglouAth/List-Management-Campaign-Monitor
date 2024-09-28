// Import required functions from the connection module
const {
  getActiveSubs,
  deleteSubscriber,
  checkAndAddSubscriber,
} = require("./connection");

// Define a constant for an invalid input message
const invalidInputMessage = "Invalid input";

// Function to get all active subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    // Call the getActiveSubs function to fetch subscribers
    const { error, results } = await getActiveSubs();
    if (error) {
      // Throw an error if there's an issue in fetching data
      throw new Error(error);
    }
    // Send the results with a 200 status code if successful
    res.status(200).send(results);
  } catch (err) {
    // Send an error message with a 400 status code if an exception occurs
    res.status(400).send(err.message);
  }
};

// Function to add a new subscriber
exports.addOneSubscriber = async (req, res) => {
  try {
    // Extract EmailAddress and Name from the request body
    const { EmailAddress, Name } = req.body;
    // Check for missing required fields
    if (!EmailAddress || !Name) {
      throw new Error(invalidInputMessage);
    }

    // Prepare subscriber details object
    const details = {
      EmailAddress,
      Name,
    };

    // Call checkAndAddSubscriber to add the subscriber
    const { error, results } = await checkAndAddSubscriber(details);

    if (error) {
      throw new Error(error.Message);
    }

    // Send the results with a 200 status code if successful
    res.status(200).send(results);
  } catch (err) {
    // Send an error message with a 400 status code if an exception occurs
    res.status(400).send(err.message);
  }
};

// Function to delete a subscriber
exports.deleteOneSubscriber = async (req, res) => {
  try {
    // Extract Email from the request parameters
    const { Email } = req.params;
    // Check for missing Email parameter
    if (!Email) {
      throw new Error(invalidInputMessage);
    }

    // Call deleteSubscriber to remove the subscriber
    const { error, results } = await deleteSubscriber(Email);
    if (error) {
      // Throw an error if there's an issue in deletion
      throw new Error(error);
    }

    // Send the results with a 200 status code if successful
    res.status(200).send(results);
  } catch (err) {
    // Send an error message with a 400 status code if an exception occurs
    res.status(400).send(err.message);
  }
};
