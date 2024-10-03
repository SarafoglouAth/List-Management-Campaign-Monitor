import * as CookieConsent from "vanilla-cookieconsent"; // Import the CookieConsent library
import pluginConfig from "./CookieConsentConfig"; // Import the CookieConsent configuration
import Cookies from "js-cookie";
const clearAllCookies = async (withSaved = false) => {
  // Reset and re-run the CookieConsent with the provided configuration
  // CookieConsent.reset(true);
  

  const allCookies = Cookies.get();
  console.log("All cookies:", allCookies);

  // Iterate over all cookies and remove those that start with _ga
  Object.keys(allCookies).forEach((cookieName) => {
    if (
      cookieName.startsWith("_ga") ||
      (withSaved && cookieName.startsWith("cc_"))
    ) {
      Cookies.remove(cookieName, { path: "/",domain: window.location.hostname });
      console.log(`Removed cookie: ${cookieName}`);
    } else {
      console.log(`Did not remove cookie: ${cookieName}`);
    }
  });
  if (withSaved) {
    CookieConsent.show();

    // show modal (if it doesn't exist, create it)
    CookieConsent.show(true);
    location.reload();

  }
};
export default clearAllCookies; // Export the clearAllCookies function as the default export
