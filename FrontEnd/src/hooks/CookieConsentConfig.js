import ReactGA from "react-ga4";
import clearAllCookies from "./clearAllCookies";

const pluginConfig = {

   
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom left",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "left",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

 

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^_ga/, // regex: match all cookies starting with '_ga'
          },
          {
            name: "_gid", // string: exact cookie name
          },
        ],
      },
      services: {
        ga: {
          label: "Google Analytics",
          onAccept: () => {
            ReactGA.initialize("G-9S7W5CXDP0");
          
          },
          onReject:  () => {
       
            clearAllCookies();
          },
        },
      },
    },
  },

  language: {
    default: "en",

    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description:
            'Our website uses tracking cookies to understand how you interact with it. The tracking will be enabled only if you accept explicitly. <a href="/data-privacy" data-cc="show-preferencesModal" class="cc__link">Manage preferences</a>',
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          //closeIconLabel: 'Close',
          footer: `
            <a href="/data-privacy">Privacy Policy</a>
            <a href="/terms-of-service">Terms Of Service</a>
          `,
        },
        preferencesModal: {
          title: "Cookie preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close",
          sections: [
            {
              title: "Cookie Usage",
              description:
                'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="/data-privacy" class="cc__link">privacy policy</a>.',
            },
            {
              title: "Strictly necessary cookies",
              // description: 'Description',
              linkedCategory: "necessary",
              cookieTable: {
                headers: {
                  name: "Name",
                  domain: "Service",
                  description: "Description",
                  expiration: "Expiration",
                },
                body: [
                  {
                    name: "cc_cookie",
                    domain: "Margera",
                    description:
                      "Cookie set to remember the user's cookie preferences.",
                    expiration: "Expires after 523 days",
                  },
                ],
              },
            },
            {
              title: "Performance and Analytics cookies",
              linkedCategory: "analytics",
              cookieTable: {
                headers: {
                  name: "Name",
                  domain: "Service",
                  description: "Description",
                  expiration: "Expiration",
                },
                body: [
                  {
                    name: "_ga",
                    domain: "Google Analytics",
                    description:
                      'Cookie set by <a target="_blank" href="https://marketingplatform.google.com/about/analytics/">Google Analytics</a>.',
                    expiration: "Expires after 12 days",
                  },
                  {
                    name: "_ga_36PHWY9VFJ",
                    domain: "Google Analytics",
                    description:
                      'Cookie set by <a target="_blank" href="https://marketingplatform.google.com/about/analytics/">Google Analytics</a>',
                    expiration: "Expires after 12 days",
                  },
                ],
              },
            },
           
          ],
        },
      },
    },
  },
};

export default pluginConfig;
