const createsend = require("createsend-node");
const dotenv = require("dotenv");

dotenv.config({ path: "./secrets.env" });
const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
const listId = process.env.CAMPAIGN_MONITOR_LIST_ID;
const LinkToUI ='https://devtest.createsend.com/audience/E7FBC73D25BDD2C0/lists/5F583515ECF75E9E?origin=&originId=&search=&direction=DESC&column=StatusDate'

if (!apiKey || !listId) {
  console.error("Environment variables are not defined");
} else {
  console.log("API Key and List ID loaded successfully");
}
const auth = {
  apiKey,
};
console.log(
  process.env.CAMPAIGN_MONITOR_LIST_ID,
  process.env.CAMPAIGN_MONITOR_API_KEY
);
const api = new createsend(auth);

const details = {
  EmailAddress: "t_sarafoglou@yahoo.com",
  Name: "Joris Joris",
};
const email = "joris@test.com";
const filter = {};

const getActiveSubs = () => {
  return new Promise((resolve) => {
    api.lists.getActiveSubscribers(listId, filter, (err, results) => {
      if (err) {
        resolve({ error: err, results: null });
      } else {
        resolve({ error: null, results: results });
      }
    });
  });
};

const addSubscriber = (details) => {
  return new Promise((resolve) => {
    api.subscribers.addSubscriber(listId, details, (err, res) => {
      if (err) {
        resolve({ error: err, results: null });
      } else {
        resolve({ error: null, results: res });
      }
    });
  });
};

const deleteSubscriber = (email) => {
  return new Promise((resolve) => {
    api.subscribers.deleteSubscriber(listId, email, (err, response) => {
      console.log(err, response, "consoleshit");
      if (err) {
        resolve({ error: err, results: null });
      } else {
        resolve({ error: null, results: response });
      }
    });
  });
};
const reactivateSubscriber = (email) => {
  return new Promise((resolve) => {
    api.subscribers.addSubscriber(
      listId,
      { EmailAddress: email, Resubscribe: true },
      (err, response) => {
        if (err) {
          resolve({ error: err, results: null });
        } else {
          resolve({ error: null, results: response });
        }
      }
    );
  });
};
const checkAndAddSubscriber = async (details) => {
  return new Promise((resolve) => {
    api.subscribers.getSubscriberDetails(
      listId,
      details.EmailAddress,
      async (err, subscriber) => {
        if (err) {
          if (err.Code === 203) {
            // Subscriber not found && Adding new subscriber...
            try {
              const result = await addSubscriber(details);
              resolve({ error: null, result });
            } catch (addErr) {
              resolve({ error: addErr, result: null });
            }
          } else {
            resolve({ error: err, result: null });
          }
        } else {
          if (subscriber && subscriber.State === "Deleted") {
            // Subscriber exists in deleted list. Reactivating...
            try {
              const result = await reactivateSubscriber(details.EmailAddress);
              resolve({ error: null, result });
            } catch (reactivateErr) {
              resolve({ error: reactivateErr, result: null });
            }
          } else {
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

const doShitNow = async () => {
  const activeSubs = await getActiveSubs();
  console.log(activeSubs);

  const deleteSubResult = await deleteSubscriber("t_sarafoglou@yahoo.com");
  console.log(deleteSubResult);

  const activeSubsAgain = await getActiveSubs();
  console.log(activeSubsAgain);

  //   const addSubscriber = await checkAndAddSubscriber(details);
  //   console.log(addSubscriber);
};
doShitNow();
