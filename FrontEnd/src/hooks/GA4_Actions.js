import ReactGA from "react-ga4";

// Function to track adding a subscriber
const trackAddSubscriber = (timeNeeded, emailType, errors = "No errors") => {
  ReactGA.event("click_add_subscriber", {
    time_needed: timeNeeded,
    email_type: emailType,
    error: errors,
  });
};

// Function to track removing a subscriber
const trackRemoveSubscriber = (position, emailType, errors) => {
  ReactGA.event("click_remove_subscriber", {
    position: position,
    email_type: emailType,
    error: errors,
  });
};

// Function to track API errors
const trackAPIError = (errorMessage, operation) => {
  ReactGA.event("cm_error", {
    error_message: errorMessage,
    operation: operation,
  });
};

const trackSubscribers = (subscriberCount, operation) => {
    
  if (operation === "create") {
    ReactGA.gtag("set", "user_properties", {
      subscriber_Count_BeforeEvent: subscriberCount,
      subscriber_Count_AfterEvent: subscriberCount + 1,
    });
    return;
  }
  if (operation === "delete") {
   
    ReactGA.gtag("set", "user_properties", {
      subscriber_Count_BeforeEvent: subscriberCount,
      subscriber_Count_AfterEvent: subscriberCount - 1,
    });
    return;
  }

//   ReactGA.gtag("set", "user_properties", {
//     subscriber_Count_BeforeEvent: subscriberCount
        
//   });
};

// Function to track time looked at CV
const trackTimeLookedAtCV = (timeSpent) => {
  ReactGA.event("time_looked_at_cv", {
    time_spent: timeSpent,
  });
};

export {
  trackAddSubscriber,
  trackRemoveSubscriber,
  trackAPIError,
  trackTimeLookedAtCV,
  trackSubscribers,
};
