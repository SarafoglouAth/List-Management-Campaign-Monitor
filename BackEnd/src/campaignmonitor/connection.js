// Import necessary modules
const createsend = require("createsend-node");
const dotenv = require("dotenv");

// Load environment variables from 'secrets.env' file
dotenv.config({ path: "./secrets.env" });

// Retrieve the Campaign Monitor API key and List ID from environment variables
const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
const listId = process.env.CAMPAIGN_MONITOR_LIST_ID;

// URL to the UI for managing the list (for reference purposes)
const LinkToUI = "https://devtest.createsend.com/audience/E7FBC73D25BDD2C0/lists/5F583515ECF75E9E?origin=&originId=&search=&direction=DESC&column=StatusDate";

// Check if the required environment variables are defined
if (!apiKey || !listId) {
  console.error("Environment variables are not defined");
} else {
  console.log("API Key and List ID loaded successfully");
}

// Set up authentication object for createsend
const auth = {
  apiKey,
};

// Create an instance of the createsend API client
const api = new createsend(auth);

// Define a filter object for fetching subscribers (currently empty)
const filter = {};

// Function to get active subscribers
const getActiveSubs = () => {
  return new Promise((resolve) => {
    // Call Campaign Monitor API to get active subscribers
    api.lists.getActiveSubscribers(listId, filter, (err, results) => {
      if (err) {
        // Resolve the promise with an error if there's an issue
        resolve({ error: err, results: null });
      } else {
        // Resolve the promise with results if successful
        resolve({ error: null, results: results });
      }
    });
  });
};

// Function to add a new subscriber
const addSubscriber = (details) => {
  return new Promise((resolve) => {
    // Call Campaign Monitor API to add a new subscriber
    api.subscribers.addSubscriber(listId, details, (err, res) => {
      if (err) {
        // Resolve the promise with an error if there's an issue
        resolve({ error: err, results: null });
      } else {
        // Resolve the promise with results if successful
        resolve({ error: null, results: res });
      }
    });
  });
};

// Function to delete a subscriber by email
const deleteSubscriber = (email) => {
  return new Promise((resolve) => {
    // Call Campaign Monitor API to delete a subscriber
    api.subscribers.deleteSubscriber(listId, email, (err, response) => {
      
      if (err) {
        // Resolve the promise with an error if there's an issue
        resolve({ error: err, results: null });
      } else {
        // Resolve the promise with results if successful
        resolve({ error: null, results: response });
      }
    });
  });
};

// Function to reactivate a deleted subscriber
const reactivateSubscriber = (email) => {
  return new Promise((resolve) => {
    // Call Campaign Monitor API to reactivate a subscriber
    api.subscribers.addSubscriber(
      listId,
      { EmailAddress: email, Resubscribe: true }, // Resubscribe set to true to reactivate
      (err, response) => {
        if (err) {
          // Resolve the promise with an error if there's an issue
          resolve({ error: err, results: null });
        } else {
          // Resolve the promise with results if successful
          resolve({ error: null, results: response });
        }
      }
    );
  });
};

// Function to check if a subscriber exists and add them if not
const checkAndAddSubscriber = async (details) => {
  return new Promise((resolve) => {
    // Call Campaign Monitor API to get subscriber details
    api.subscribers.getSubscriberDetails(
      listId,
      details.EmailAddress,
      async (err, subscriber) => {
        if (err) {
          if (err.Code === 203) {
            // Error code 203 indicates subscriber not found; attempt to add a new subscriber
            try {
              const result = await addSubscriber(details);
              resolve({ error: null, result });
            } catch (addErr) {
              // Resolve with error if adding the subscriber fails
              resolve({ error: addErr, result: null });
            }
          } else {
            // Resolve with error if it's not a "not found" error
            resolve({ error: err, result: null });
          }
        } else {
          // Check if the subscriber exists but is in the "Deleted" state
          if (subscriber && subscriber.State === "Deleted") {
            // Reactivate the subscriber
            try {
              const result = await reactivateSubscriber(details.EmailAddress);
              resolve({ error: null, result });
            } catch (reactivateErr) {
              // Resolve with error if reactivation fails
              resolve({ error: reactivateErr, result: null });
            }
          } else {
            // Resolve with error indicating subscriber already exists
            resolve({
              error: { Message: "Subscriber already exists" },
              result: null,
            });
          }
        }
      }
    );
  });
};

// Export the functions for use in other modules
module.exports = { getActiveSubs, deleteSubscriber, checkAndAddSubscriber };
